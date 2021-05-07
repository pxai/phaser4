export default class Scene1 extends Phaser.Scene
{
    constructor ()
    {
        super('scene1');
    }

    init () {
        console.log("Before preload");
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create ()
    {
        console.log("Yea");

        const logo = this.add.image(400, 70, 'logo');
    }
}