<?php

// Register menus
add_action( 'after_setup_theme', 'react_wp_rest_setup' );
function react_wp_rest_setup() {
	register_nav_menus(
		array(
			'main-menu' => __( 'Main Menu', 'react_wp_rest' ),
            'footer-menu' => __( 'Footer Menu', 'react_wp_rest' )
		)
	);
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'posts', '/random', array(
        'methods'   =>  'GET',
        'callback'  =>  'get_random',
        'permission_callback' => function (WP_REST_Request $request) {
            return true;
        }
    ) );
}, 15 );

function get_random($request) {
    $posts = get_posts( array( 'orderby' => 'rand', 'posts_per_page' => 3) );
    $controller = new WP_REST_Posts_Controller('post');

    foreach ( $posts as $post ) {
        $data    = $controller->prepare_item_for_response( $post, $request );
        $randomposts[] = $controller->prepare_response_for_collection( $data );
    }

    // return results
    return new WP_REST_Response($randomposts, 200);
}

// Enable upload of VCF, SVG
function custom_mime_types($mime_types){
	$mime_types['svg'] = 'image/svg+xml'; //Adding svg extension
	return $mime_types;
}
add_filter('upload_mimes', 'custom_mime_types', 1, 1);

function themename_post_formats_setup() {
    add_theme_support( 'post-formats', array( 'video', 'gallery', 'image' ) );
}
add_action( 'after_setup_theme', 'themename_post_formats_setup' );