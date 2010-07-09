$(document).ready(function(){

    // Setup schema search tabset
    var $schema_explorer_search_tabset = $("#schema-search > .section-tabset").tabs("#schema-search > .search-box");
    
    // Make table sortable
/*
    $(".table").tablesorter({
        cssAsc: "column-header-asc",
        cssDesc: "column-header-desc",
        cssHeader: "column-header",
        sortList: [[0,0]]
    });
*/


    var MQL_FILTERS = {
        domain : [{ "key": [{"namespace" : "/" }] }],
        type : [{ "/type/type/domain": [{ "key" : [{ "namespace" : "/" }] }], "a:/type/type/domain": { "id": "/freebase", "optional" : "forbidden" } }],
        property : [{ "/type/property/schema": { "type": "/type/type", "domain": [{ "key" : [{ "namespace" : "/" }] }], "a:domain" : { "id" : "/freebase", "optional" : "forbidden" } } }]
    }
 
    /* 
        DOMAIN SUGGEST
    */
    var $domain_input = $("#domain-search-input");
    var $domain_form = $domain_input.closest("form");
    
    var domain_suggest_options = { "type" : "/type/domain" };
    
    if ($("#domain-search-toggle-commons").is(":checked")) {
        domain_suggest_options.mql_filter = MQL_FILTERS.domain;
    }

    $domain_input.suggest(domain_suggest_options)
    .bind("fb-select", function(e, data){
        var url = $domain_form.attr("action");       
        window.location.href = url + data.id;
    })
    .focus(function() {
        this.select();
    });
    
    /*
        TYPE SUGGEST
    */
    var $type_input = $("#type-search-input");
    var $type_form = $type_input.closest("form");

    var type_suggest_options = { "type" : "/type/type" };

    if ($("#type-search-toggle-commons").is(":checked")) {
        type_suggest_options.mql_filter = MQL_FILTERS.type;
    }
    
    $type_input.suggest(type_suggest_options)
   .bind("fb-select", function(e, data){
        var url = $type_form.attr("action");
        window.location.href = url + data.id;
    })
    .focus(function() {
        this.select();
    });

    /*
        PROPERTY SUGGEST
    */
    var $property_input = $("#property-search-input");
    var $property_form = $property_input.closest("form");
    
    var property_suggest_options = { "type" : "/type/property" };

    if ($("#property-search-toggle-commons").is(":checked")) {
        property_suggest_options.mql_filter = MQL_FILTERS.property;
    }
    
    $property_input.suggest(property_suggest_options)
   .bind("fb-select", function(e, data){
        var url = $property_form.attr("action");
        window.location.href = url + data.id;
    })
    .focus(function() {
        this.select();
    });

    /*
        USER SUGGEST
    */
/*
    var $user_input = $("#user-search-input");
    var $user_form = $user_input.closest("form");
*/
    

    // On click for radio buttons, we have to update mql_filter params and reinitialize suggest
    $(".search-toggle").click(function(e){
    
        // focus related input
        var $text_input = $(this).parent().siblings("form").find(".text-input").focus();
        
        // We grab the radio buttons closest form
        // and compare it's ID to decide which mql_filter
        // we need to update

        $el = $(this);
        $parent = $(this).closest("form");

        // Split ID to compare string
        el_id = $el.attr("id").split("-");
        
        // Domain
        if ($parent.attr("id") === $domain_form.attr("id")) {
        
            if (el_id[el_id.length-1] === "commons") {            
                domain_suggest_options.mql_filter = MQL_FILTERS.domain;
            }
            else {
                delete domain_suggest_options.mql_filter;
            }

            $domain_input.suggest(domain_suggest_options);        
        }
        
        // Type
        if ($parent.attr("id") === $type_form.attr("id")) {
        
            if (el_id[el_id.length-1] === "commons") {            
                type_suggest_options.mql_filter = MQL_FILTERS.type;
            }
            else {
                delete type_suggest_options.mql_filter;
            }

            $type_input.suggest(type_suggest_options);
        }
        
        // Property
        if ($parent.attr("id") === $property_form.attr("id")) {

            if (el_id[el_id.length-1] === "commons") {            
                property_suggest_options.mql_filter = MQL_FILTERS.property;
            }
            else {
                delete property_suggest_options.mql_filter;
            }
            
            $property_input.suggest(property_suggest_options);

        }

    });

});


// We have to force the digit parser to ignore commas for proper sorting on high instance counts
// See http://www.barneyb.com/barneyblog/2009/06/03/jquery-tablesorter-comma-parser/
jQuery.tablesorter.addParser({
  id: "commaDigit",
  is: function(s, table) {
    var c = table.config;
    return jQuery.tablesorter.isDigit(s.replace(/,/g, ""), c);
  },
  format: function(s) {
    return jQuery.tablesorter.formatFloat(s.replace(/,/g, ""));
  },
  type: "numeric"
});