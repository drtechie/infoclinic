import React from 'react';
import { Helmet } from 'react-helmet';

export default class InfoClinicHelmet extends React.Component {
    render() {
        const {
            title,
            description,
            imageURL,
            type,
            relativeURL,
            articlePublishDate,
            articleModifiedDate,
        } = this.props;
        let infoClinicDesc = 'The cure for ignorance is balanced knowledge.';
        let infoClinicTitle = 'Info Clinic - The cure for ignorance is balanced knowledge';
        let url = 'https://www.infoClinic.in';
        if (title) {
            infoClinicTitle = `${ title } | ${ infoClinicTitle }`;
        }
        if (description) {
            infoClinicDesc = description;
        }
        if (relativeURL) {
            url = `${ 'https://www.infoclinic.in' }${ relativeURL }`;
        }
        return (
            <Helmet>
                <meta charSet='utf-8' />
                <title>{ infoClinicTitle }</title>
                <link rel='canonical' href={ url } />
                <meta
                    name='description'
                    content={ infoClinicDesc }
                />
                <meta itemProp='name' content={ infoClinicTitle } />
                {
                    imageURL && <meta itemProp='image' content={ imageURL } />
                }
                {
                    imageURL && <meta name='twitter:card' content='summary_large_image' />
                }
                <meta name='twitter:site' content='@InfoClinicIndia' />
                {
                    title && <meta name='twitter:title' content={ infoClinicTitle } />
                }
                <meta name='twitter:description' content={ infoClinicDesc } />
                {
                    imageURL && <meta name='twitter:image:src' content={ imageURL } />
                }

                <meta property='og:title' content={ infoClinicTitle } />
                <meta property='og:type' content={ type || 'website' } />
                <meta property='og:relativeURL' content={ url } />
                <meta property='og:image' content={ imageURL } />
                <meta property='og:description' content={ infoClinicDesc } />
                <meta property='og:site_name' content={ infoClinicTitle } />
                {
                    (type === 'article') && <meta property='article:modified_time' content={ articleModifiedDate } />
                }
                {
                    (type === 'article') && <meta property='article:published_time' content={ articlePublishDate } />
                }
                <meta property='fb:admins' content='' />
            </Helmet>
        );
    }
}
