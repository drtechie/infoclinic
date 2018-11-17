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
                'user_nicename' => $author->user_nicename,
                'description' => $author->description,
                'avatar_url' => scrapeImage(get_wp_user_avatar($author->ID, "thumbnail")),
            );
        };

        return $authors;
    }
}

if ( function_exists('get_wp_user_avatar') ) {
    add_action( 'rest_api_init', 'custom_register_author_image' );
    function custom_register_author_image() {
        register_rest_field( 'user',
            'avatar_url',
            array(
                'get_callback'    => 'custom_get_avatar_url',
                'update_callback' => null,
                'schema'          => null,
            )
        );
    }

    function custom_get_avatar_url( $object, $field_name, $request ) {
        return scrapeImage(get_wp_user_avatar($object['id'], "thumbnail"));
    }
}

function scrapeImage($text) {
    $pattern = '/src=[\'"]?([^\'" >]+)[\'" >]/';
    preg_match($pattern, $text, $link);
    $link = $link[1];
    $link = urldecode($link);
    return $link;
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