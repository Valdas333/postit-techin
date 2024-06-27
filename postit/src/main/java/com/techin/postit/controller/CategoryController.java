package com.techin.postit.controller;

import com.techin.postit.model.Advertisement;
import com.techin.postit.model.Category;
import com.techin.postit.repository.AdvertisementRepository;
import com.techin.postit.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final AdvertisementRepository advertisementRepository;

    public CategoryController(CategoryRepository categoryRepository, AdvertisementRepository advertisementRepository) {
        this.categoryRepository = categoryRepository;
        this.advertisementRepository = advertisementRepository;
    }

    @PostMapping("/add")
    public String addCategory(@RequestBody Category category) {
        if (categoryRepository.findByName(category.getName()).isEmpty()){
            categoryRepository.save(category);
            return "Category added successfully";
        }
        return "Category already exists";
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public String deleteCategory(@PathVariable Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()){
            Category category = optionalCategory.get();
            for (Advertisement advertisement : category.getAdvertisements()) {
                advertisement.setCategory(null);
                advertisementRepository.save(advertisement);
            }
            categoryRepository.deleteById(id);
            return "Category deleted successfully";
        }
        return "Category not found";
    }

    @PutMapping("/update/{id}")
    public String updateCategory(@PathVariable String id, @RequestBody Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(Long.valueOf(id));
        if (existingCategory.isPresent()) {
            Category updatedCategory = existingCategory.get();
            updatedCategory.setName(category.getName());
            categoryRepository.save(updatedCategory);
            return "Category updated successfully";
        } else {
            return "Category not found";
        }
    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
