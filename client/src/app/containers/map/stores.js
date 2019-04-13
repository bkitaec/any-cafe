import image1 from 'app/assets/img/bg.jpg';
import image2 from 'app/assets/img/bg2.jpg';
import image3 from 'app/assets/img/bg3.jpg';

export default [
    {
        name: 'Terrace. Sea view',
        image: image1,
        location: {
            coordinates: {
                lat: 46.476276,
                lng: 30.765324,
            },
            full_address: 'Endereço Completo aqui #1',
        },
        phone: '65 9332-6545',
        type: {
            name: 'Loja',
            slug: 'loja',
        },
    },
    {
        name: 'Lanzheron beach, 1/1',
        image: image2,
        location: {
            coordinates: {
                lat: 46.477059,
                lng: 30.7651958,
            },
            full_address: 'Endereço Completo aqui #2',
        },
        phone: '65 9332-6545 / 4555-8788',
        type: {
            name: 'Ponto de Venda',
            slug: 'ponto',
        },
    },
    {
        name: 'Траса здоров’я, Lanzheron',
        image: image3,
        location: {
            coordinates: {
                lat: 46.476054,
                lng: 30.763779,
            },
            full_address: 'Endereço Completo aqui #2',
        },
        phone: '65 9332-6545 / 4555-8788',
        type: {
            name: 'Ponto de Venda',
            slug: 'ponto',
        },
    },
    {
        name: 'Avocado, Lanzheron beach',
        image: image2,
        location: {
            coordinates: {
                lat: 46.473897,
                lng: 30.764465,
            },
            full_address: 'Endereço Completo aqui #2',
        },
        phone: '65 9332-6545 / 4555-8788',
        type: {
            name: 'Loja',
            slug: 'loja',
        },
    },
    {
        name: 'Lanzheron Beach',
        image: image1,
        location: {
            coordinates: {
                lat: 46.472759,
                lng: 30.764744,
            },
            full_address: 'Endereço Completo aqui #2',
        },
        phone: '65 9332-6545 / 4555-8788',
        type: {
            name: 'Loja',
            slug: 'loja',
        },
    },
    {
        name: 'Брама дачі Ланжерон',
        image: image1,
        location: {
            district: {
                name: 'Montese',
                slug: 'montese',
            },
            coordinates: {
                lat: 46.477487,
                lng: 30.762062,
            },
            full_address: 'Endereço Completo aqui #2',
        },
        phone: '65 9332-6545 / 4555-8788',
        type: {
            name: 'Ponto de Venda',
            slug: 'ponto',
        },
    },
].map((rest, id) => ({ ...rest, id: id + 1 }));
