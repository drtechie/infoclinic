<?php
namespace Deployer;

// Load .env
require_once(__DIR__ . '/vendor/autoload.php');
(new \Dotenv\Dotenv(__DIR__))->load();

require 'recipe/common.php';

// Project name
set('application', 'infoclinic');

// Project repository
set('repository', 'https://github.com/drtechie/infoclinic');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true); 

// Shared files/dirs between deploys 
set('shared_files', ['.env', 'client/.env']);
set('shared_dirs', ['client/node_modules', 'client/dist', 'vendor', 'wordpress', 'uploads', 'logs']);

// Writable dirs by web server 
set('writable_dirs', []);

// Hosts
host(getenv('DEPLOY_HOST'))
    ->user(getenv('DEPLOY_USER'))
    ->port(getenv('DEPLOY_PORT'))
    ->set('deploy_path', getenv('DEPLOY_PATH'));
    

// Tasks

desc('Deploy Info Clinic');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'yarn:install',
    'theme:setup',
    'theme:upload',
    'yarn:build',
    'deploy:clear_paths',
    'deploy:symlink',
    'pm2:restart',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');


desc('yarn install');
task('yarn:install', function () {
    run('cd {{release_path}}/client && yarn install --check-files');
});

desc('yarn build');
task('yarn:build', function () {
    run('cd {{release_path}}/client && yarn build');
});

desc('composer install');
task('composer:install', function () {
    run('cd {{release_path}} && composer install');
});

desc('theme setup');
task('theme:setup', function () {
    run('cd {{release_path}} && composer run-script copy-theme');
    run('cd {{release_path}} && composer run-script copy-config');
});

desc('theme upload');
task('theme:upload', function () {
    run('rm -rf {{release_path}}/wordpress/wp-content/uploads && ln -sf {{release_path}}/uploads {{release_path}}/wordpress/wp-content/');
});

desc('infoclinic install');
task('infoclinic:install', function () {
    run('composer run-script infoclinic-install');
});

desc('pm2 restart');
task('pm2:restart', function () {
    run('pm2 restart infoclinic');
});

