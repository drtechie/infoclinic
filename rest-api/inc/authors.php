<?php

/**
 * Make sure coauthors fields are added to post response
 */
if ( function_exists('get_coauthors') ) {
    add_action( 'rest_api_init', 'custom_register_coauthors' );
    function custom_register_coauthors() {
        register_rest_field( 'post',
            'coauthors',
            array(
                'get_callback'    => 'custom_get_coauthors',
                'update_callback' => null,
                'schema'          => null,
            )
        );
    }

    function custom_get_coauthors( $object, $field_name, $request ) {
        $coauthors = get_coauthors($object['id']);

        $authors = array();
        foreach ($coauthors as $author) {
            $authors[] = array(
                'display_name' => $author->display_name,
                'user_nicename' => $author->user_nicename
            );
        };

        return $authors;
    }
}

/**
 * WP-API can take additional coauthor query to get all posts of a coauthor
 * Eg:- wp-json/wp/v2/posts?coauthor=test
 */

add_filter('rest_post_query', function ($args, $request) {
    $author = $request->get_param( 'coauthor' );

    if ( $author ) {
        $args[ 'tax_query' ] = array(
            array(
                'taxonomy' => 'author',
                'field' => 'name',
                'terms' => $author,
            )
        );
    }

    return $args;
}, 1, 2);