## Based on 

[Server Side Rendered / Code Split React + Wordpress REST API - built by Keen](https://github.com/keen-studio/react-wp-rest)

## Global requirements

 - Node 10+
 - WP CLI
 - Node Foreman
 - Composer
 - yarn
 
 ## Initial setup
 
 ### Install dependencies & Wordpress setup
 
 1. Install dependencies with `composer install`
 2. Setup DB `composer run-script infoclinic-install`
 
 ### Setup env
 
 1. `cp .env.example .env` and edit it
 2. Find [Wordpress salts here](https://api.wordpress.org/secret-key/1.1/salt/)
 3. `cd client && cp .env.example .env` and edit it
 
 ### Run server
 
Start server with Node Foreman `nf start`

### Wordpress setup

1. Visit `http://localhost:8080` and login with `admin` and `password`
2. Activate plugins and `rest-api` theme.
3. Add a new page called `Home`, set it to use the `Home` page template, and then set it as your front page in the `Settings -> Reading -> Your homepage displays` section
4. Change Permalinks to the 'Custom Structure' option and enter `/post/%postname%/`
5. Update your Site Address within `Settings -> General` to your SSR app (default: http://localhost:1337)

 
 
 
 