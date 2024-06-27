package com.techin.postit.service;

import com.techin.postit.model.Advertisement;
import com.techin.postit.model.Category;
import com.techin.postit.model.requests.AdvertisementRequestDTO;
import com.techin.postit.repository.AdvertisementRepository;
import com.techin.postit.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final CategoryRepository categoryRepository;

    public AdvertisementService(AdvertisementRepository advertisementRepository, CategoryRepository categoryRepository) {
        this.advertisementRepository = advertisementRepository;
        this.categoryRepository = categoryRepository;
    }

    public void saveAdvertisement(AdvertisementRequestDTO advertisementRequestDTO) {
        Category category = getCategory(advertisementRequestDTO.getCategory());
        Advertisement advertisement = createAdvertisementFromRequestDTO(advertisementRequestDTO, category);
        advertisementRepository.save(advertisement);
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }

    private Advertisement createAdvertisementFromRequestDTO(AdvertisementRequestDTO requestDTO, Category category) {
        return Advertisement.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .city(requestDTO.getCity())
                .price(requestDTO.getPrice())
                .category(category)
                .build();
    }

    public String updateAdvertisementById(Long id, AdvertisementRequestDTO advertisement) throws Exception {
        Optional<Advertisement> existingAdvertisementOptional = advertisementRepository.findById(id);
        if (existingAdvertisementOptional.isPresent()) {
            Advertisement existingAdvertisement = existingAdvertisementOptional.get();
            updateAdvertisementDetails(existingAdvertisement, advertisement);
            advertisementRepository.save(existingAdvertisement);
            return "Advertisement updated successfully";
        } else {
            throw new Exception("Advertisement with id " + id + " does not exist");
        }
    }

    private void updateAdvertisementDetails(Advertisement existingAdvertisement, AdvertisementRequestDTO advertisement) {
        if (advertisement.getTitle() != null){
            existingAdvertisement.setTitle(advertisement.getTitle());
        }
        if (advertisement.getDescription() != null) {
            existingAdvertisement.setDescription(advertisement.getDescription());
        }
        if (advertisement.getCity() != null){
            existingAdvertisement.setCity(advertisement.getCity());
        }
        if(advertisement.getPrice() != null){
            existingAdvertisement.setPrice(advertisement.getPrice());
        }
        if (advertisement.getCategory() != null ){
            Category category = getCategory(advertisement.getCategory());
            existingAdvertisement.setCategory(category);
        }
    }
}
