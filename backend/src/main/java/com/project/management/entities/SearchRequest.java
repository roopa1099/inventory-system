package com.project.management.entities;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("filter")
    @JsonAlias({"filter", "status"})
    private String filter;

    @JsonProperty("search")
    @JsonAlias({"search", "searchText"})
    private String search;

    @JsonProperty("limit")
    @JsonAlias({"limit", "pageSize", "size"})
    @Builder.Default
    private int pageSize = 0;

    @JsonProperty("offset")
    @JsonAlias({"offset", "pageNo", "page"})
    private int pageNumber;

    private String sortBy;

    private String orderBy;

    public void setSearchText(String search) {
        this.search = search;
    }

    public void setPageSize(int limit) {
        this.pageSize = limit;
    }

    public void setSize(int limit) {
        this.pageSize = limit;
    }

    public void setPageNo(int offset) {
        this.pageNumber = offset;
    }

    public void setPage(int offset) {
        this.pageNumber = offset;
    }

    public void setStatus(String filter) {
        this.filter=filter;
    }
}
