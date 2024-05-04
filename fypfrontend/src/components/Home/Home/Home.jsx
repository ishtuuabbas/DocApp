import React from 'react';

import Footer from '../../Shared/Footer/Footer';

import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities';
import Availabe from '../AvailableFeatures/Available';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';
import Service from '../Services/Service';
import Gallery from '../Gallery/Gallery';


const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <Service />
            <ClinicAndSpecialities />
         
          
            <Availabe />
         
          
            <Gallery/>
            <Footer />
        </>
    );
};

export default Home;