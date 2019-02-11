<?php

/**
 *  Send fcm notifications whenever a new post is published.
 * @param $new_status
 * @param $old_status
 * @param $post
 */

function send_fcm_notification( $new_status, $old_status, $post ) {
    if ( 'post' !== $post->post_type )
        return;

    if ( $new_status == 'publish' && $old_status != 'publish' ) {
        //firebase topic
        $to = '/topics/infoclinic-updates';
        //firebase url
        $url = 'https://fcm.googleapis.com/fcm/send';
        // prep the bundle
        $msg = array
        (
            'body' 	        => $post->post_title,
            'title'	        => 'ഒരു പുതിയ ലേഖനം പ്രസിദ്ധീകരിച്ചു!',
            'click_action'  => 'https://infoclinic.in/posts/'.$post->post_name,
            'vibrate'	    => 1,
            'sound'		    => 1,
        );
        $fields = array
        (
            'to' => $to,
            'notification' => $msg
        );
        //send request to firebase
        wp_remote_post($url, array(
                'method' => 'POST',
                'blocking' => true,
                'headers' => array( 'Authorization' => 'key='. getenv('FB_SERVER_KEY'),'Content-Type' => 'application/json' ),
                'httpversion' => '1.0',
                'sslverify' => false,
                'body' => json_encode($fields),
            )
        );

    }
}

add_action('transition_post_status', 'send_fcm_notification', 10, 3 );