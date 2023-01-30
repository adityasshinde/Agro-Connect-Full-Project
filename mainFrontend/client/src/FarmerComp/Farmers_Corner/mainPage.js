import React from "react";
import classes from './mainPage.module.css';
import cc1 from '../../images/cc1.png';
import cc2 from '../../images/cc2.png';
import cc3 from '../../images/cc3.png';
import cc4 from '../../images/cc4.png';

const MainPage=()=>{

    return <div className={classes.main}>
        <span className={classes.head}>Farmer's Corner</span>
        <span className={classes.span}>Introducing Farmer's Corner, which is a section completely dedicated to our beloved Farmers with the vision of providing informative and educational content specifically related to Agriculture.
Our goal is to help farmers gain more knowledge and stay informed about the latest trends and techniques in the industry, so that they can improve their farming practices and ultimately increase their productivity and profitability.</span>
        <div className={classes.cards}>
        <div className={classes.card}>
            <img src={cc1} alt="Loading"></img>
                <h3>Blogs</h3>
                <a href="https://mahadhan.co.in/knowledge-centre/blogs/?_page=3" target="_blank" className={classes.button}>Explore</a>
            </div>
            <div className={classes.card}>
            <img src={cc2} alt="Loading"></img>
                <h3>Latest News</h3>
                <a href="https://www.livemint.com/industry/agriculture" target="_blank" className={classes.button}>Explore</a>
            </div>
            <div className={classes.card}>
            <img src={cc3} alt="Loading"></img>
                <h3>Articles</h3>
                <a href="https://www.agrifarming.in/" target="_blank" className={classes.button}>Explore</a>
            </div>
            <div className={classes.card}>
            <img src={cc4} alt="Loading"></img>
                <h3>Videos</h3>
                <a href="https://www.farmers.gov/conservation/conservation-at-work" target="_blank" className={classes.button}>Explore</a>
            </div>
        </div>
    </div>
};


export default MainPage;