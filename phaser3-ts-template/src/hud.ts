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
        this.pointsTxt.text = Phaser.Utils.String.Pad(this.registry.get('points'), 5, '0', 1);
    }

}