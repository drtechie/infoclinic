<?php

/**
 * Co-authors in RSS and other feeds
 * /wp-includes/feed-rss2.php uses the_author(), so we selectively filter the_author value
 */
function db_coauthors_in_rss( $the_author ) {

    if ( !is_feed() || !function_exists( 'coauthors') ){
        return $the_author;
    }
    else{
        return coauthors( null, null, null, null, false );
    }

}
add_filter( 'the_author', 'db_coauthors_in_rss');