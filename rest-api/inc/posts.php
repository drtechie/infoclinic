<?php

/**
 * Add more fields to REST API Response
 */

add_action( 'rest_api_init', 'add_reading_time_to_post');

function add_reading_time_to_post() {
    register_rest_field( 'post',
        'reading_time',
        array(
            'get_callback'    => 'add_reading_time_to_json',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function add_reading_time_to_json( $object, $field_name, $request ){
    $time = rt_calculate_reading_time( $object['id'] );
    return $time;
}

function rt_calculate_reading_time( $rt_post_id ) {

    $rt_content       = get_post_field( 'post_content', $rt_post_id );
    $number_of_images = substr_count( strtolower( $rt_content ), '<img ' );

    $rt_content = strip_shortcodes( $rt_content );

    $words_to_count = wp_strip_all_tags($rt_content);
    $words_to_count = trim($words_to_count);
    $word_count = count(explode(" ",$words_to_count));

    $additional_words_for_images = rt_calculate_images( $number_of_images, 200 );
    $word_count                 += $additional_words_for_images;

    $reading_time = ceil( $word_count / 200 );

    // If the reading time is 0 then return it as < 1 instead of 0.
    if ( 1 > $reading_time ) {
        $reading_time = '< 1';
    }

    return $reading_time;

}

function rt_calculate_images( $total_images, $wpm ) {
    $additional_time = 0;
    // For the first image add 12 seconds, second image add 11, ..., for image 10+ add 3 seconds.
    for ( $i = 1; $i <= $total_images; $i++ ) {
        if ( $i >= 10 ) {
            $additional_time += 3 * (int) $wpm / 60;
        } else {
            $additional_time += ( 12 - ( $i - 1 ) ) * (int) $wpm / 60;
        }
    }

    return $additional_time;
}