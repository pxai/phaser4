export default class Scene1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    constructor ()
    {
        super('Scene1');
    }

    init () {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create ()
    {
        console.log("Juegi!");
        const logo = this.add.image(400, 70, 'logo');
        const playText: Phaser.GameObjects.Text = this.add.text(
            50, 
            this.height/2, 
            'JUEGO', 
            {fontSize:'32px', color:'#FFFFFF'})
    }
}