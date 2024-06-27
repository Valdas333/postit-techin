package com.techin.postit.model;

import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Table(name = "roles")
public enum Role {
    USER, ADMIN
}
