import { LightningElement,track } from 'lwc';

export default class LwcBasicCaseStudy1 extends LightningElement {

    @track styleClass;
    handleClickFirst()
    {
        this.styleClass = 'style1';
    }

    handleClickSecond()
    {
        this.styleClass = 'style2';
    }

    handleClickThird()
    {
        this.styleClass = 'style3';
    }
}

