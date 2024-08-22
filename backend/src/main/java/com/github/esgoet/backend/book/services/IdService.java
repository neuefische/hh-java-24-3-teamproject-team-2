package com.github.esgoet.backend.book.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IdService {

    public String randomId() {
        return UUID.randomUUID().toString();
    }
}
