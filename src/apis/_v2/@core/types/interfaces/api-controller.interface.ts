
export interface ApiController {
    /**
     * Returns an array of ApiConnectors that this controller manages.
     */
     
    getControllers(): object[];
}