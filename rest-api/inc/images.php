<?php


/*
* Create custom thumbnails
*
*/
if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'blog-image', 640, 360, true);
    add_image_size( 'blog-mini', 200, 200, true);
    add_image_size( 'blog-thumbnail', 12, 8, true);
    add_filter('image_size_names_choose', 'info_clinic_image_sizes');
}

function info_clinic_image_sizes($sizes) {
    $addsizes = array(
        "blog-image" => __( "Blog Image"),
        "blog-mini" => __( "Blog Mini Image"),
        "blog-thumbnail" => __( "Blog Thumbnail Image")
    );
    $newsizes = array_merge($sizes, $addsizes);
    return $newsizes;
}

/**
 * Add more fields to REST API Response
 */

add_action( 'rest_api_init', 'add_image_url_to_post');

function add_image_url_to_post() {
    register_rest_field( 'post',
        'featured_image_url',
        array(
            'get_callback'    => 'add_featured_image_url_to_json',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'featured_image_url_mini',
        array(
            'get_callback'    => 'add_featured_image_url_to_json_mini',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post',
        'featured_image_url_thumb',
        array(
            'get_callback'    => 'add_featured_image_url_to_json_thumb',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function add_featured_image_url_to_json( $object, $field_name, $request ){
    if (has_post_thumbnail($object['id'])) {
        $image = wp_get_attachment_image_src(get_post_thumbnail_id($object['id']), 'blog-image');
        return $image[0];
    } else {
        return null;
    }
}

function add_featured_image_url_to_json_mini( $object, $field_name, $request ){
    if (has_post_thumbnail($object['id'])) {
        $image_mini = wp_get_attachment_image_src(get_post_thumbnail_id($object['id']), 'blog-mini');
        return $image_mini[0];
    } else {
        return null;
    }
}

function add_featured_image_url_to_json_thumb( $object, $field_name, $request ){
    if (has_post_thumbnail($object['id'])) {
        $image_thumb = wp_get_attachment_image_src(get_post_thumbnail_id($object['id']), 'blog-thumbnail');
        return $image_thumb[0];
    } else {
        return null;
    }
}