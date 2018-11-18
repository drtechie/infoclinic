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
set('shared_dirs', ['client/node_modules', 'vendor', 'wordpress']);

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
    'composer:install',
    'yarn:install',
    'theme:setup',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');


desc('yarn install');
task('yarn:install', function () {
    run('cd {{deploy_path}}/shared/client && yarn install --check-files');
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

desc('infoclinic install');
task('infoclinic:install', function () {
    run('composer run-script infoclinic-install');
});

