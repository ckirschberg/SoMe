// Classes and objects in typescript.
export class Dog {
    // name: string;
    // color: string;
    // species: string;

    constructor(private name: string, public color: string, 
        public species: string) {
        // this.name = name;
        // this.color = color;
        // this.species = species
    }

    // private property and public method with a rule about data validation
    setName(name: string) {
        if (name.length === 0) {
            throw new Error("Name must be at least 3 characters");
        }
        this.name = name;
    }
    getName() {
        return this.name;
    }

}

let dog = new Dog("Fido", "Brown", "Golden retriever");
console.log(dog.getName());