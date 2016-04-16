var man = {
    name: 'Bosn',
    get age(){
        return new Date().getFullYear();
    },
    set age(val){
        console.log('Age cannot be set to '+val);
    }
}

console.log(man.age);
man.age = 100;
console.log(man.age);