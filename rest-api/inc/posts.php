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
    $reading_time_wp = new Reading_Time_WP();
    $rt_reading_time_options = get_option( 'rt_reading_time_options' );
    $time = $reading_time_wp->rt_calculate_reading_time( $object['id'], $rt_reading_time_options );
    return $time;
}