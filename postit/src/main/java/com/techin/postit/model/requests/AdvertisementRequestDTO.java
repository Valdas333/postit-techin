package com.techin.postit.model.requests;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdvertisementRequestDTO {
    private Long id;
    private String title;
    private String description;
    private String city;
    private Integer price;
    private Long category;
}