package com.project.management.entities;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.project.management.models.Filter;
import com.project.management.models.Pagination;
import com.project.management.models.Sort;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO defining search attributes
 *
 * @author FICO
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest {



    private Filter filterBy;

    private Pagination pagination;

    private Sort sortBy;


    public void setFilterBy(Filter filterBy) {
        this.filterBy = filterBy;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    public void setSortBy(Sort sort) {
        this.sortBy = sort;
    }
    
}
