package com.example.demo;

import java.util.List;

public interface SearchRepository {
	List<FetchData> searchInput(String text);

}
