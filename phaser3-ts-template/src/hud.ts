export default class Hud extends Phaser.Scene {
    private pointsTxt : Phaser.GameObjects.Text;

    constructor(){
        super('Hud');
    }

    create(): void{
        const scene1: Phaser.Scene = this.scene.get('Scene1');
        scene1.events.on('updatePoints', this.updatePoints, this);

        this.pointsTxt = this.add.text(20,20, '0', {fontSize:'32px', color:'#FFFFFF'});
    }

    private updatePoints(): void{
        this.pointsTxt.text = "Points:" + this.registry.get('points');
    }

}