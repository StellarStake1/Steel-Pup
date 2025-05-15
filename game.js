class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('fondo', 'assets/imagenes/22.png');
        this.load.image('titulo', 'assets/imagenes/hola.png');
        this.load.image('boton1', 'assets/imagenes/boton1.png');
        this.load.image('boton2', 'assets/imagenes/boton2.png');
        this.load.image('boton3', 'assets/imagenes/boton3.png');
        this.load.image('boton1_hover', 'assets/imagenes/boton1_hover.png');
        this.load.image('boton2_hover', 'assets/imagenes/boton2_hover.png');
        this.load.image('boton3_hover', 'assets/imagenes/boton3_hover.png');
        this.load.image('creditos', 'assets/imagenes/creditos.png');
        this.load.image('botonSalir', 'assets/imagenes/exit.png');
        this.load.image('botonSalir_hover', 'assets/imagenes/exit_hover.png');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        const logo = this.add.image(this.game.config.width / 2, 80, 'titulo').setOrigin(0.5).setScale(0.21);

        const buttonSpacing = 22;
        const buttonYStart = 200;

        this.createButton(this.game.config.width / 2, buttonYStart, 'boton1', 'boton1_hover', null, 'Nivel1');
        this.createButton(this.game.config.width / 2, buttonYStart + 58 + buttonSpacing, 'boton2', 'boton2_hover');
        this.createButton(this.game.config.width / 2, buttonYStart + 58 * 2 + buttonSpacing * 2, 'boton3', 'boton3_hover', 'creditos');
        this.createButton(this.game.config.width / 2, buttonYStart + 58 * 3 + buttonSpacing * 3, 'botonSalir', 'botonSalir_hover', 'salir');
    }

    createButton(x, y, buttonKey, hoverKey, tipo = null, sceneKey = null) {
        const button = this.add.image(x, y, buttonKey).setOrigin(0.5).setInteractive().setDisplaySize(150, 58);

        button.on('pointerover', () => button.setTexture(hoverKey));
        button.on('pointerout', () => button.setTexture(buttonKey));

        button.on('pointerdown', () => {
            if (tipo === 'creditos') {
                this.mostrarCreditos();
            } else if (tipo === 'salir') {
                this.salirDelJuego();
            } else if (sceneKey) {
                this.scene.start(sceneKey);
            }
        });
    }

    mostrarCreditos() {
        if (!this.creditosImage) {
            this.creditosImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'creditos').setOrigin(0.5);
            this.input.once('pointerdown', () => {
                this.creditosImage.destroy();
                this.creditosImage = null;
            });
        }
    }

    salirDelJuego() {
        window.location.href = 'salida.html';
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [MainScene, Nivel1,] 
};

const game = new Phaser.Game(config);
