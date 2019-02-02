<?php

/**
 * Allow GET requests from SSR and dev CRA origins
 * Thanks to https://joshpress.net/access-control-headers-for-the-wordpress-rest-api/
 */
add_action( 'rest_api_init', function() {

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
/*
		// Site URL defined in WP
		$allowed_origin_1 = get_site_url();
        $allowed_origin_4 = get_bloginfo('wpurl');

		// Create React App Default Port 3000
		$parsed = parse_url($allowed_origin_1);
		$allowed_origin_2 = $parsed['scheme'] . '://' . $parsed['host'] . ':3000';
        $allowed_origin_3 = $parsed['scheme'] . '://' . $parsed['host'] . ':1337';

		// Need to allow both SSR and dev CRA access
		if(isset($_SERVER['HTTP_ORIGIN'])) {
			$origin = $_SERVER['HTTP_ORIGIN'];
			if($origin == $allowed_origin_1 || $origin == $allowed_origin_2 || $origin == $allowed_origin_3 || $origin == $allowed_origin_4) {

			}
		}*/
        $host = get_site_url();
        if (getenv('STAGE') == 'development') {
            $host = $_SERVER['HTTP_ORIGIN'];
        } else if (getenv('STAGE') == 'production') {
            $prod_host = $_SERVER['HTTP_ORIGIN'];
            if ($prod_host == 'https://infoclinic.in' || $prod_host == 'https://www.infoclinic.in')
            $host = $prod_host;
        }
        header('Access-Control-Allow-Origin: '.$host);
		header( 'Access-Control-Allow-Methods: GET' );
		header( 'Access-Control-Allow-Credentials: true' );
		return $value;
	});
}, 15 );

