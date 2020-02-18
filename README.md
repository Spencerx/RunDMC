# RunDMC

## NOTES

This application makes heavy use of MarkLogic XSLT to transform content stored in the database into templatized
web pages.  There is plenty of sample code, but it is not designed, currently, for easy learning purposes.

## LICENSE

All original code in this repository is Copyright MarkLogic 2010-2014.  All Rights Reserved.  It is made available
for your use via an Apache 2.0 license (http://www.apache.org/licenses/LICENSE-2.0.html)

## SETUP NOTES

Configuration and deployment are managed through [Roxy](https://github.com/marklogic/roxy).

You have the option of installing just the Docs application (as seen at http://docs.marklogic.com) or the entire RunDMC
application, including Docs (as seen at http://developer.marklogic.com).

### Configuration

#### Prerequisites

- MarkLogic 7.0-4.1 or later
- Ruby 1.9.3+ (for Roxy)

#### Ports

To set up the application, first check whether the default ports work for you. You can see the default ports by viewing
deploy/build.properties or by asking Roxy:

    $ ./ml local info | grep port

The info command shows you the properties as Roxy sees them.

If you want to change the ports, the admin password, or other properties for your local environment, do so by creating a
`deploy/local.properties` file. You can create this file directly, or by setting the login credentials:
```
    $ ./ml local credentials
```
Once you have a `deploy/local.properties` file you can edit it as needed. Copy any properties you wish to change from
`deploy/build.properties` into `deploy/local.properties`, and set the values as needed. Do not check this file in:
this file is used for local configuration changes only. This file is already ignored by default as part of the
`.gitignore` file.

#### Local configuration

A typical `local.properties` would contain the following entries:

    app-modules-db=filesystem
    modules-root=${basedir}\src
    mlcp-home=C:\mlcp-9.0.4
    
    build-zip-path=${basedir}\\MarkLogic_9_pubs.zip
    build-version=10.0
    build-clean=0
    server-version=9

  * `mlcp-home` should match the extract location of [MLCP](https://developer.marklogic.com/products/mlcp/)
  * `server-version` should match the MarkLogic version you have available.
  * `modules-root` should match your project's `src` directory. Use of `${basedir}` allows us to assume the project 
     directory. If you wish to use a database for `app-modules-db`, then you would have to adjust this to just `/`

If you change the ports, you will also need to create src/config/server-urls-local.xml. This file is also not to be
checked in. You can copy the host/@type="local" example from server-urls.xml. Both files will be loaded (if present),
and the -local version will take precedence if present.

As a side note, the included `ml.bat` is outdated and may not work with MarkLogic 10. you would need to invoke a self
upgrade of ml-roxy first: `ml.bat upgrade`

#### Referenced files/folders

`src/download` is meant to be a link to a server folder that contains the binaries available for download. This has
been known to cause issues in a Windows environment. Replace the link with an actual folder or update the reference
to point to an existing location.

`src/config/disqus-info.xml` is expected to contain disqus integration related information. You may use 
`src/config/disqus-info.SAMPLE.xml` as reference on what this file should contain.

### Bootstrapping

Run the bootstrap command: 

    $ ./ml local bootstrap

You may append "dmc" or "docs" to the command; if you do not, it will prompt
you to specify which application it should set up.

To use the full RunDMC application, you do need to get some initial files into
the content database. This step is not necessary if you are only setting up the
Docs application.

    $ ./ml local deploy content

### Adding Documentation

The Docs app takes a .zip file containing all documentation for a MarkLogic release as input and puts the contents
into the content database. 

    $ ./ml local deploy_docs

Properties can also be supplied in an environment-specific file
such as `local.properties`:

    build-version=8.0
    build-zip-path=/tmp/MarkLogic_8_pubs.zip
    build-clean=1

These properties can also be supplied as part of a command.

    $ ./ml local deploy_docs --ml.build-zip-path=/tmp/MarkLogic_8_pubs.zip

`build-zip-path` is required to be accessible by the MarkLogic system role, e.g. daemon. It is also required to be an
absolute path.

If you don't want to rebuild the entire doc set, specific actions can also be supplied via another property. For
example this command will rebuild the TOC.

    $ ./ml local deploy_docs --ml.build-actions=setup

The available actions are implemented in `src/apidoc/setup.xqy`.

#### Ruby gem Requirement

You may receive an error if you do not have all required Ruby gems installed.

    ERROR: The net-http-digest_auth gem is required for this feature.

net-http-digest_auth is required for deploy_docs.  To install this gem and proceed:

    $ sudo gem install net-http-digest_auth

## Servers

This project is actually a family of applications. 

### Main server

This is the parent application, as is seen on developer.marklogic.com. 

### API/Docs server

This is the documentation host - like docs.marklogic.com
   
### Draft server

This app server must have the word "Draft" in its name.

On another port, same exact configuration as main server but with a different server name. "Draft" documents will be 
visible on this server. For "preview" to work in the Admin UI, update /config/server-urls.xml with the correct host 
name and corresponding draft server URL.  Default is same hostname, port 8004.

### Admin interface (CMS) server

This app server must have the word "Admin" in its name. This is used to edit content that will appear on DMC. 

### WebDAV server

If you want "view XML source" to work in the admin UI, set up a WebDAV server with root set to "/". Then add the server 
URL to /config/server-urls.xml.  Default is same hostname, port 8005.

Note: OS X users, you will want to keep OS X from creating .DS_Store files
by doing the following

    % defaults write com.apple.desktopservices DSDontWriteNetworkStores true

### XDBC server

If you want to use the loading tools to copy a database from the live developer site, you'll need an XDBC server.

## Code Notes

The four most important code directories are "model", "view", "controller", and "config":

### model

Contains XQuery modules for data access and document filtering.

### view

Contains the XSLT code for rendering the content of the site, including navigational behavior, widget rendering, 
implementation of the tag library, etc. The stylesheet "page.xsl" is the only top-level stylesheet that gets invoked. 
It imports or includes everything else.

### controller

Contains the URL rewriter and XQuery scripts for handling HTTP requests and for invoking the (XSLT) view code 
(transform.xqy).

### config

Contains the sitemap configuration, XHTML template configuration, server URL configuration, and widget configuration.


## Content management

Some documents in the content database drive the application itself. 

### admin

Contains a complete application for managing XML content via Web forms. Contains its own "model", "view", 
"controller", and "config" directories.

## Other READMEs

For more details, see the various README.txt files appearing in sub-directories.
