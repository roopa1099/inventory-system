package com.project.management.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.project.management.models.Filter;
import com.project.management.models.Pagination;
import com.project.management.models.SortBy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest {

    private Filter filterBy;

    private Pagination pagination;

    private SortBy sortBy;

    public void setFilterBy(Filter filterBy) {
        this.filterBy = filterBy;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    public void setSortBy(SortBy sort) {
        this.sortBy = sort;
    }

}

