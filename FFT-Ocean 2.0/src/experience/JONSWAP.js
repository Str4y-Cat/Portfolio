
export default class JONSWAP
{
    constructor(fetch, windSpeed)
    {
        this.F=fetch                        //fetch
        this.U=windSpeed                    //windSpeed

        this.g= 9.8                         //gravity
        this.Y= 3.3                         //peakEnhancement
        this.h=40                   
        this.spectralEnergyFactor=0         //test for creative control
        this.setDynamicValues()


        // console.table(this)
    }

    setDynamicValues(){
        this.a= this.getSpectralEnergy()    //spectralEnergy
        this.wp= this.getPeakFrequency()    //peakFrequency
    }
    
    //checked
    getPeakFrequency()
    {
        return 22*(
            Math.pow((this.g**2)/(this.U*this.F),1/3)
        )
    }

    //checked
    getSpectralEnergy()
    {
         return (0.076+ this.spectralEnergyFactor )* (
            Math.pow(
                (this.U**2)/(this.F*this.g),0.22
            ))
    }

    getSpectralWidth(w)
    {
        return (w<=this.wp)? 0.07 : 0.09
    }

    setFetch(f)
    {
        this.F=f
        this.setDynamicValues()
    }

    setWindSpeed(u)
    {
        this.U=u
        this.setDynamicValues()
    }

    /**
     * returns spectral density based on input frequency
     * based on JONSWAP equation, found here  https://wikiwaves.org/Ocean-Wave_Spectra
     *  
     * @param {*} f frequency 
     * @returns 
     */
    getJONSWAP(f)
    {
        const w= 2* Math.PI * f
        //checked
    

        const A= (this.a*(this.g**2))/Math.pow(w,5)
        //checked


        const B= Math.exp(
            -(5/4) * Math.pow((this.wp/w),4)
        )
        //checked

        const o = this.getSpectralWidth(w)
        const r= Math.exp
        (
            -((w-this.wp)**2)/(2* o**2 * this.wp**2 )
        )
        // console.log("r: ",r)

        const C= Math.pow(this.Y,r)
        // console.log("c: ",C)

        return A*B*C

    }

    getSpectrumParameters()
    {

        return {

            F  : this.F ,       
            U  : this.U ,       
            g  : this.g , 
            Y  : this.Y , 
            a  : this.a , 
            wp : this.wp, 
            h  : this.h,
            pi : Math.PI,
        }

    }
}