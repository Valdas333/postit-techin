package com.techin.postit.controller;


import com.techin.postit.model.Advertisement;
import com.techin.postit.model.requests.AdvertisementRequestDTO;
import com.techin.postit.repository.AdvertisementRepository;
import com.techin.postit.service.AdvertisementService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
@RestController
public class AdvertisementController {

    private final AdvertisementRepository advertisementRepository;
    private final AdvertisementService advertisementService;

    public AdvertisementController(AdvertisementRepository advertisementRepository, AdvertisementService advertisementService) {
        this.advertisementRepository = advertisementRepository;
        this.advertisementService = advertisementService;
    }

    @PostMapping("/add/advertisement")
    public ResponseEntity<String> addAdvertisement(@RequestBody AdvertisementRequestDTO advertisementRequestDTO) {
        advertisementService.saveAdvertisement(advertisementRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Advertisement created successfully");
    }

    @DeleteMapping("/delete/advertisement/{id}")
    public ResponseEntity<String> deleteAdvertisement(@PathVariable Long id) {
        advertisementRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Advertisement with id: " + id + " does not exist"));
        advertisementRepository.deleteById(id);
        return new ResponseEntity<>("Advertisement deleted successfully.", HttpStatus.OK);
    }

    @PutMapping("/edit/advertisement/{id}")
    public ResponseEntity<String> editAdvertisement(@PathVariable Long id, @RequestBody AdvertisementRequestDTO advertisement) {
        try {
            return ResponseEntity.ok(advertisementService.updateAdvertisementById(id, advertisement));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/advertisements")
    public Iterable<Advertisement> getAllAdvertisements() {
        return advertisementRepository.findAll();
    }

}
