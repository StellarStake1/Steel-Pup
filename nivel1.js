class Nivel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel1' });
        
        // Sistema de vidas
        this.vidasJugador = 5;
        this.vidasJugador2 = 5;
        this.maxVidas = 5;
        this.invulnerableJugador = false;
        this.invulnerableJugador2 = false;
        
        // Sistema de daño por tiempo
        this.tiempoEnDanoJugador = 0;
        this.tiempoEnDanoJugador2 = 0;
        this.estaEnDanoJugador = false;
        this.estaEnDanoJugador2 = false;
        
        // Sistema de daño por colisiones rápidas
        this.contadorColisionesJugador = 0;
        this.contadorColisionesJugador2 = 0;
        this.ultimaColisionJugador = 0;
        this.ultimaColisionJugador2 = 0;
        
        // Sistema de ventana emergente
        this.ventanaActiva = false;
        this.intentosRestantes = 1;

        // Control de capas
        this.capasActivas = {
            6: true,
            7: true,
            8: true,
            9: true
        };

        this.llavesRecolectadas = 0;
        this.maxLlaves = 10;
        
        // Estado del juego
        this.juegoIniciado = false;
        this.juegoPausado = false; 
        
        
        // Sistema de disparos Villanos
        //this.intervaloDisparo = 2000; 
        //this.velocidadBala = 250; 
        //his.ultimoDisparoVillano1 = 0;
        //this.ultimoDisparoVillano2 = 0;

        this.estaDisparando = false;
        this.keyDisparo = null;
        
        this.estaDisparando = false;
        this.keyDisparo = null;
        this.balasRobot = null; 
        this.ultimoDisparo = 0;
        this.intervaloDisparo = 1000; 
        this.velocidadBala = 400;
        
        this.danoVillano1 = 0;
        this.danoVillano2 = 0;
        this.danosParaMatar = 1; 

        this.nivelCompletado = false;

    }
  
    preload() {
        
        //this.load.image('fondo1', 'assets/imagenes/level1.png');
        //this.load.image('fondo2', 'assets/imagenes/level2.png');
        //this.load.image('fondo3', 'assets/imagenes/level3.png');
        this.load.image('tejas2', 'assets/mapa/tejas2.png');
        this.load.image('ventana', 'assets/MiniJ/Fondo1.png');
        this.load.video('videoIntro', 'assets/intro/inicio.mp4', 'loadeddata', false, true);
        this.load.image('botonMini1', 'assets/MiniJ/BotonA.png');
        this.load.image('botonMini2', 'assets/MiniJ/BotonB.png');
        this.load.image('botonMini3', 'assets/MiniJ/BotonC.png');
        this.load.image('llave', 'assets/imagenes/llave.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
        
        this.load.spritesheet('personaje', 'assets/personajes/1.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('personaje2', 'assets/personajes/2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('villanoFinal', 'assets/personajes/Final.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('escudo', 'assets/personajes/escudo.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('disparo', 'assets/personajes/Disparo.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('villano', 'assets/personajes/villano.png');
        //this.load.image('bala', 'assets/personajes/bala1.png');

        
        
        this.load.image('vida100', 'assets/vida/vida100.png');
        this.load.image('vida80', 'assets/vida/vida80.png');
        this.load.image('vida60', 'assets/vida/vida60.png');
        this.load.image('vida40', 'assets/vida/vida40.png');
        this.load.image('vida20', 'assets/vida/vida20.png');
        this.load.image('vida0', 'assets/vida/vida0.png');
        
        this.load.image('iconoRobot', 'assets/personajes/icono2.png');
        this.load.image('iconoPerro', 'assets/personajes/icono1.png');
        
        this.load.image('instrucciones', 'assets/imagenes/instrucciones.png'); 
        this.load.image('botonIniciar', 'assets/imagenes/botonlisto.png');

        this.load.audio('colisionSonido', 'assets/sonidos/llave.mp3');
        this.load.audio('disparoSound', 'assets/sonidos/laser.mp3');
        this.load.audio('muerteVillano', 'assets/sonidos/muerte.mp3');

        this.load.image('botonPausa', 'assets/imagenes/Pausa.png');
        this.load.image('BOTON1', 'assets/imagenes/Reanudar.png');
        this.load.image('BOTON2', 'assets/imagenes/Ajustes.png');
        this.load.image('BOTON3', 'assets/imagenes/Salir.png');
        
    }
    
  
    create() {

     if (!this.textures.exists('balaAmarilla')) {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xFFFF00, 1); 
        graphics.fillCircle(8, 8, 8);    
        graphics.generateTexture('balaAmarilla', 16, 16); 
        graphics.destroy(); 
    }
        this.mostrarVideoIntro();
        this.menuPausa = {
            fondo: null,
            botonReanudar: null,
            botonOpciones: null,
            botonSalir: null
        };
    }
    
    mostrarVideoIntro() {
        const video = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'videoIntro')
            .setOrigin(0.5)
            .setDepth(100);
        
        const scaleX = this.cameras.main.width / video.width;
        const scaleY = this.cameras.main.height / video.height;
        const scale = Math.min(scaleX, scaleY);
        video.setScale(scale).setScrollFactor(0);
        
        video.play(false);
        
        video.on('complete', () => {
            video.destroy();
            this.mostrarPantallaInstrucciones();
        });
        
        video.setInteractive().on('pointerdown', () => {
            video.stop();
            video.destroy();
            this.mostrarPantallaInstrucciones();
        });
    }
    
    mostrarPantallaInstrucciones() {
        this.fondoOscuro = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(100);
        
        this.imagenInstrucciones = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'instrucciones')
            .setOrigin(0.5)
            .setDepth(101);
        
        this.botonIniciar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 120, 'botonIniciar')
            .setOrigin(0.5)
            .setInteractive()
            .setDepth(101)
            .on('pointerdown', () => {
                this.ocultarPantallaInstrucciones();
                this.iniciarJuego();
            });
        
        this.botonIniciar.on('pointerover', () => {
            this.botonIniciar.setScale(1.05);
        });
        
        this.botonIniciar.on('pointerout', () => {
            this.botonIniciar.setScale(1);
        });
    }
    
    ocultarPantallaInstrucciones() {
        this.fondoOscuro.destroy();
        this.imagenInstrucciones.destroy();
        this.botonIniciar.destroy();
    }
    
    iniciarJuego() {
        this.juegoIniciado = true;
        
        // Fondos
        this.add.image(0, 0, 'fondo1').setOrigin(0, 0);
        this.add.image(800, 0, 'fondo2').setOrigin(0, 0);
        this.add.image(1600, 0, 'fondo3').setOrigin(0, 0);
  
        // Mapa y tileset
        const map = this.make.tilemap({ key: 'mapa' });
        const tileset1 = map.addTilesetImage('tejas2', 'tejas2');
  
        // Capas de colisión
        const plataformaLayer1 = map.createStaticLayer('Capa de patrones 1', tileset1, 0, 0);
        plataformaLayer1.setCollisionByExclusion([-1]);
  
        this.plataformaLayer2 = map.createStaticLayer('Capa de patrones 2', tileset1, 0, 0);
        this.plataformaLayer2.setCollisionByExclusion([-1]);
  
        const plataformaLayer3 = map.createStaticLayer('Capa de patrones 3', tileset1, 0, 0);
        plataformaLayer3.setCollisionByExclusion([-1]);
  
        const botonLayer = map.createStaticLayer('Capa de patrones 4', tileset1, 0, 0);
        botonLayer.setCollisionByExclusion([-1]);
  
        this.plataformaLayer5 = map.createStaticLayer('Capa de patrones 5', tileset1, 0, 0);
        this.plataformaLayer5.setCollisionByExclusion([-1]);

        // Capas 6-9
        this.plataformaLayer6 = map.createStaticLayer('Capa de patrones 6', tileset1, 0, 0);
        this.plataformaLayer6.setCollisionByExclusion([-1]);
        
        this.plataformaLayer7 = map.createStaticLayer('Capa de patrones 7', tileset1, 0, 0);
        this.plataformaLayer7.setCollisionByExclusion([-1]);
        
        this.plataformaLayer8 = map.createStaticLayer('Capa de patrones 8', tileset1, 0, 0);
        this.plataformaLayer8.setCollisionByExclusion([-1]);
        
        this.plataformaLayer9 = map.createStaticLayer('Capa de patrones 9', tileset1, 0, 0);
        this.plataformaLayer9.setCollisionByExclusion([-1]);

        this.plataformaLayer10 = map.createStaticLayer('Capa de patrones 10', tileset1, 0, 0);
        this.plataformaLayer10.setCollisionByExclusion([-1]);
  
        // Jugadores
        this.jugador = this.physics.add.sprite(50, 400, 'personaje', 0).setScale(1.5);
        this.jugador.setSize(25, 35).setOffset(20, 25);
        this.jugador.setCollideWorldBounds(true);
  
        this.jugador2 = this.physics.add.sprite(50, 115, 'personaje2', 0).setScale(1);
        this.jugador2.setCollideWorldBounds(true).setSize(25, 35).setOffset(20, 25);

        // Villanos
        const villanoX = 1350; 
        const villanoY = 400;  
        this.villano = this.physics.add.sprite(villanoX, villanoY, 'villano').setScale(1.5);
        this.villano.setSize(20, 30).setOffset(22, 30);
        this.villano.movementBounds = { left: villanoX - 100, right: villanoX + 100};

        const villano2X = 1000; 
        const villano2Y = 50;  
        this.villano2 = this.physics.add.sprite(villano2X, villano2Y, 'villano').setScale(1.5);
        this.villano2.setSize(20, 30).setOffset(22, 30);
        this.villano2.setFlipX(true);
        this.villano2.movementBounds = { left: villano2X - 90, right: villano2X + 90};
        
        // Sistema de disparos
//this.balasVillano1 = this.physics.add.group();
//this.balasVillano2 = this.physics.add.group();

// Configurar colisiones para las balas
//this.physics.add.collider(this.balasVillano1, plataformaLayer1, this.destruirBala, null, this);
//this.physics.add.collider(this.balasVillano2, plataformaLayer1, this.destruirBala, null, this);
//this.physics.add.collider(this.balasVillano1, this.plataformaLayer2, this.destruirBala, null, this);
//this.physics.add.collider(this.balasVillano2, this.plataformaLayer2, this.destruirBala, null, this);
//this.physics.add.collider(this.balasVillano1, this.plataformaLayer5, this.destruirBala, null, this);
//this.physics.add.collider(this.balasVillano2, this.plataformaLayer5, this.destruirBala, null, this);
//this.physics.add.overlap(this.balasVillano1, this.jugador, (bala, jugador) => {
//    this.balaImpactaJugador(bala, jugador);
//}, null, this);
//this.physics.add.overlap(this.balasVillano1, this.jugador2, (bala, jugador) => {
//    this.balaImpactaJugador(bala, jugador);
//}, null, this);
//this.physics.add.overlap(this.balasVillano2, this.jugador, (bala, jugador) => {
//    this.balaImpactaJugador(bala, jugador);
//}, null, this);
//this.physics.add.overlap(this.balasVillano2, this.jugador2, (bala, jugador) => {
//    this.balaImpactaJugador(bala, jugador);
//}, null, this);
        
        // Configurar colisiones para las balas

        this.balasRobot = this.physics.add.group({
    defaultKey: 'balaAmarilla'
});
        this.physics.add.collider(this.balasRobot, plataformaLayer1, this.destruirBala, null, this);
        
        // Configurar colisiones para capas 6-9
        this.configurarColisionesCapas();

        // Colisión jugadores vs otras capas
        this.physics.add.collider(this.jugador, plataformaLayer1);
        this.physics.add.collider(this.jugador2, plataformaLayer1);
        this.physics.add.collider(this.jugador, this.plataformaLayer2);
        this.physics.add.collider(this.jugador2, this.plataformaLayer2);
        this.physics.add.collider(this.villano, plataformaLayer1);
        this.physics.add.collider(this.villano2, plataformaLayer1);
        this.physics.add.collider(this.jugador, this.plataformaLayer10, () => this.finalizarNivel(), null, this);
        this.physics.add.collider(this.jugador2, this.plataformaLayer10, () => this.finalizarNivel(), null, this);

        // Colisiones balas con villanos
this.physics.add.overlap(this.balasRobot, this.villano, (bala, villano) => {
    this.procesarImpactoBala(bala, villano, 'villano1');
}, null, this);

this.physics.add.overlap(this.balasRobot, this.villano2, (bala, villano) => {
    this.procesarImpactoBala(bala, villano, 'villano2');
}, null, this);

         // Colisiones con capa de daño, el piso con pinchos
        this.physics.add.collider(
            this.jugador, 
            plataformaLayer3, 
            () => this.iniciarContactoDano('jugador1'), 
            null, 
            this
        );
        
        this.physics.add.collider(
            this.jugador2, 
            plataformaLayer3, 
            () => this.iniciarContactoDano('jugador2'), 
            null, 
            this
        );
        
        this.physics.add.overlap(
            this.jugador,
            plataformaLayer3,
            null,
            () => this.finalizarContactoDano('jugador1'),
            this
        );
        
        this.physics.add.overlap(
            this.jugador2,
            plataformaLayer3,
            null,
            () => this.finalizarContactoDano('jugador2'),
            this
        );
  
        // Colisión con Capa de Patrones 4, esto es para la ventana Emergente 
        this.ventanaActiva = false;
        this.botonCollider = this.physics.add.collider(
            this.jugador2,
            botonLayer,
            this.activarVentanaEmergente,
            null,
            this
        );
        
        this.physics.add.collider(this.jugador, this.plataformaLayer5);
        this.physics.add.collider(this.jugador2, this.plataformaLayer5);
  
        // UI de vidas
        const posY = 30;
        const espacioEntreBarras = 200;
        
        this.add.image(50, posY, 'iconoRobot').setScrollFactor(0).setScale(0.5);
        this.barraVidaJugador = this.add.sprite(120, posY, 'vida100').setScrollFactor(0).setScale(0.4);
        
        this.add.image(50 + espacioEntreBarras, posY, 'iconoPerro').setScrollFactor(0).setScale(0.5);
        this.barraVidaJugador2 = this.add.sprite(120 + espacioEntreBarras, posY, 'vida100').setScrollFactor(0).setScale(0.4);
  
        this.botonPausa = this.add.image(this.cameras.main.width - 50, 30, 'botonPausa')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(100)
            .on('pointerdown', () => this.togglePausa());
        this.botonPausa.on('pointerover', () => this.botonPausa.setScale(0.55));
        this.botonPausa.on('pointerout', () => this.botonPausa.setScale(0.5));
        
    

        // Animaciones jugador 1 el Robot
        this.anims.create({
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('personaje', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle1',
            frames: [{ key: 'personaje', frame: 4 }],
            frameRate: 20
        });
  
        // Animaciones jugador 2 el Perro
        this.anims.create({
            key: 'walk2Right',
            frames: this.anims.generateFrameNumbers('personaje2', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk2Left',
            frames: this.anims.generateFrameNumbers('personaje2', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle2Left',
            frames: [{ key: 'personaje2', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'idle2Right',
            frames: [{ key: 'personaje2', frame: 5 }],
            frameRate: 20
        });

        // Villano Final 
const villanoFinalX = 2200;  
const villanoFinalY = 400;   
this.villanoFinal = this.physics.add.sprite(villanoFinalX, villanoFinalY, 'villanoFinal')
    .setScale(1.5)
    .setSize(50, 60)
    .setOffset(7, 4)
    .setDepth(1000)  
    .setActive(true)
    .setVisible(true);


this.villanoFinal.movementBounds = { 
    left: villanoFinalX - 100, 
    right: villanoFinalX + 100 
};

// Animaciones para el villano final 
this.anims.create({
    key: 'villanoFinalWalk',
    frames: this.anims.generateFrameNumbers('villanoFinal', { 
        start: 0, 
        end: 3,
        frameRate: 10
    }),
    frameRate: 8,
    repeat: -1,
    yoyo: true
});

this.anims.create({
    key: 'villanoFinalIdle',
    frames: [
        { key: 'villanoFinal', frame: 0 },
        { key: 'villanoFinal', frame: 1 }
    ],
    frameRate: 2,
    repeat: -1
});

// Configurar colisiones
this.physics.add.collider(this.villanoFinal, plataformaLayer1);
this.physics.add.overlap(this.balasRobot, this.villanoFinal, (bala, villano) => {
    this.procesarImpactoBala(bala, villano, 'villanoFinal');
}, null, this);

// Animación de disparo para el robot
    this.anims.create({
            key: 'disparo1',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

       
        this.keyDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.spriteDisparo = this.add.sprite(0, 0, 'disparo')
        .setVisible(false)
        .setScale(1.5);
        
        // Escudo
        this.escudo = this.add.sprite(0, 0, 'escudo', 1).setScale(1.5).setVisible(false);
  
        // Ventana emergente
        this.ventanaEmergente = this.add.sprite(400, 300, 'ventana')
            .setOrigin(0.5)
            .setDisplaySize(400, 300)
            .setVisible(false);
  
        this.boton1 = this.add.image(400, 300, 'botonMini1')
            .setOrigin(0.5)
            .setVisible(false)
            .setInteractive()
            .on('pointerdown', () => this.manejarBotonIncorrecto());
            
        this.boton2 = this.add.image(400, 355, 'botonMini2')
            .setOrigin(0.5)
            .setVisible(false)
            .setInteractive()
            .on('pointerdown', () => this.manejarBotonIncorrecto());
            
        this.boton3 = this.add.image(400, 410, 'botonMini3')
            .setOrigin(0.5)
            .setVisible(false)
            .setInteractive()
            .on('pointerdown', () => this.manejarBotonCorrecto());
  
      
        this.mensajeVentana = this.add.text(400, 500, '', {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center',
            backgroundColor: '#000000',
            wordWrap: { width: 380 },
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setVisible(false);
        
        
        this.keysWASD = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.keyShield = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.ultimaDireccionPerro = 'right';
        // Cámara y límites
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }
    // Aca tenemos el sistema de Disparo
    /*
dispararVillano1() {
    const ahora = this.time.now;
    if (ahora - this.ultimoDisparoVillano1 < this.intervaloDisparo) return;
    
    this.ultimoDisparoVillano1 = ahora;
    
    const bala = this.balasVillano1.create(
        this.villano.x - 20,
        this.villano.y,
        'bala'
    ).setScale(0.6);
    
    bala.setVelocityX(-this.velocidadBala);
    bala.body.allowGravity = false;
    bala.setSize(12, 8, true);
    bala.setOffset(2, 4);
    
    this.time.delayedCall(5000, () => {
        if (bala.active) bala.destroy();
    });
}

dispararVillano2() {
    const ahora = this.time.now;
    if (ahora - this.ultimoDisparoVillano2 < this.intervaloDisparo) return;
    
    this.ultimoDisparoVillano2 = ahora;
    
    const bala = this.balasVillano2.create(
        this.villano2.x + 20,
        this.villano2.y,
        'bala'
    ).setScale(0.6);
    
    bala.setVelocityX(this.velocidadBala);
    bala.body.allowGravity = false;
    bala.setSize(12, 8, true);
    bala.setOffset(2, 4);
    
    this.time.delayedCall(5000, () => {
        if (bala.active) bala.destroy();
    });
}

balaImpactaJugador(bala, jugador) {
    // Verificar si la bala ya fue destruida
    if (!bala.active) return;
    
    // Verificar si el jugador está protegido
    if (jugador === this.jugador && this.keyShield.isDown) {
        this.destruirBala(bala);
        return;
    }
    
    // Destruir la bala primero
    this.destruirBala(bala);
    
    // Aplicar daño al jugador
    const tipoJugador = (jugador === this.jugador) ? 'jugador1' : 'jugador2';
    this.aplicarDanoReal(tipoJugador);
}

destruirBala(bala) {
    if (bala && bala.active) {
        // Desactivar la bala primero
        bala.setActive(false).setVisible(false);
        
        // Destruir el cuerpo físico
        if (bala.body) {
            this.physics.world.disableBody(bala.body);
        }
        
        // Destruir la bala después de un breve tiempo
        this.time.delayedCall(100, () => {
            if (bala) bala.destroy();
        });
    }
}
*/
dispararBala() {
     const bala = this.balasRobot.create(
        this.jugador.x + (this.jugador.flipX ? -30 : 30),
        this.jugador.y
    ).setScale(0.5); 
    
    bala.setVelocityX(this.jugador.flipX ? -this.velocidadBala : this.velocidadBala);
    bala.body.allowGravity = false;
    this.time.delayedCall(4000, () => bala.active && bala.destroy());
    
    this.sound.play('disparoSound', { volume: 0.3 });
}

destruirBala(bala) {
    if (bala && bala.active) {
        this.tweens.add({
            targets: bala,
            alpha: 0,
            scale: 0.1,
            duration: 100,
            onComplete: () => {
                if (bala.active) {
                    bala.destroy();
                }
            }
        });
    }
}

procesarImpactoBala(bala, villano, tipoVillano) {
    
    this.destruirBala(bala);
    if (villano.invulnerable) return;
    let danosRequeridos = this.danosParaMatar;
    if (tipoVillano === 'villanoFinal') {
        danosRequeridos = 5;
        this.danoVillanoFinal = (this.danoVillanoFinal || 0) + 1;
    } else if (tipoVillano === 'villano1') {
        this.danoVillano1++;
    } else {
        this.danoVillano2++;
    }

    
    this.mostrarEfectoImpacto(villano, tipoVillano);
    if ((tipoVillano === 'villano1' && this.danoVillano1 >= danosRequeridos) ||
        (tipoVillano === 'villano2' && this.danoVillano2 >= danosRequeridos) ||
        (tipoVillano === 'villanoFinal' && this.danoVillanoFinal >= danosRequeridos)) {
        this.eliminarVillano(villano, tipoVillano);
    } else if (tipoVillano === 'villanoFinal') {
        
        villano.invulnerable = true;
        this.time.delayedCall(1000, () => {
            if (villano.active) villano.invulnerable = false;
        });
    }
}

mostrarEfectoImpacto(villano, tipoVillano) {
    if (tipoVillano === 'villanoFinal') {
        villano.setTintFill(0xFF0000);
        this.tweens.add({
            targets: villano,
            alpha: 0.7,
            duration: 200,
            yoyo: true,
            onComplete: () => villano.clearTint()
        });
    } else {
        villano.setTint(0xFF0000);
        this.time.delayedCall(200, () => villano.clearTint());
    }
    
   
    this.tweens.add({
        targets: villano,
        x: villano.x + (Phaser.Math.Between(-20, 20)),
        duration: 100
    });
}
eliminarVillano(villano, tipoVillano) {
    if (tipoVillano === 'villanoFinal') {
      
        this.cameras.main.shake(500, 0.02);
        this.cameras.main.flash(500, 255, 0, 0);
        
        const explosion = this.add.particles('villanoFinal')
            .createEmitter({
                frame: [0, 1, 2, 3],
                x: villano.x,
                y: villano.y,
                lifespan: 1000,
                speed: { min: 100, max: 200 },
                scale: { start: 1.5, end: 0 },
                rotate: { start: 0, end: 360 },
                blendMode: 'ADD',
                quantity: 20,
                gravityY: 200
            });
            
        this.time.delayedCall(1000, () => {
            villano.destroy();
            explosion.stop();
            this.mostrarMensaje('¡JEFE DERROTADO!', this.cameras.main.centerX, this.cameras.main.centerY);
        });
    } else {
       
        this.tweens.add({
            targets: villano,
            alpha: 0,
            scale: 0.5,
            duration: 500,
            onComplete: () => villano.destroy()
        });
    }
    
    this.sound.play('muerteVillano', { volume: 0.7 });
    
    if (tipoVillano === 'villano1') this.danoVillano1 = 0;
    else if (tipoVillano === 'villano2') this.danoVillano2 = 0;
    else if (tipoVillano === 'villanoFinal') this.danoVillanoFinal = 0;
}
    

    togglePausa() {
        this.juegoPausado = !this.juegoPausado;
        
        if (this.juegoPausado) {
            this.physics.pause();
            this.botonPausa.setTexture('botonReanudar');
            
            
            this.menuPausa.fondo = this.add.graphics()
                .fillStyle(0x000000, 0.7)
                .fillRoundedRect(
                    this.cameras.main.centerX - 200, 
                    this.cameras.main.centerY - 200, 
                    400, 
                    400, 
                    20
                )
                .setScrollFactor(0)
                .setDepth(99);
    
            
            const centerX = this.cameras.main.centerX;
            let centerY = this.cameras.main.centerY - 80; 
            
            
            const espacioVertical = 100;
            const escalaBoton = 0.8;
    
            this.menuPausa.boton1 = this.add.image(centerX, centerY, 'BOTON1')
                .setScrollFactor(0)
                .setScale(escalaBoton)
                .setInteractive()
                .setDepth(100)
                .on('pointerdown', () => {
                    this.reanudarJuego();
                })
                .on('pointerover', () => {
                    this.menuPausa.boton1.setScale(escalaBoton * 1.1);
                })
                .on('pointerout', () => {
                    this.menuPausa.boton1.setScale(escalaBoton);
                });
    
        
            centerY += espacioVertical;
            this.menuPausa.boton2 = this.add.image(centerX, centerY, 'BOTON2')
                .setScrollFactor(0)
                .setScale(escalaBoton)
                .setInteractive()
                .setDepth(100)
                .on('pointerover', () => {
                    this.menuPausa.boton2.setScale(escalaBoton * 1.1);
                })
                .on('pointerout', () => {
                    this.menuPausa.boton2.setScale(escalaBoton);
                });
    
            
            centerY += espacioVertical;
            this.menuPausa.boton3 = this.add.image(centerX, centerY, 'BOTON3')
            .setScrollFactor(0)
            .setScale(escalaBoton)
            .setInteractive()
            .setDepth(100)
            .on('pointerdown', () => {
                this.sound.stopAll();
                 this.scene.start('MainScene');})
                 .on('pointerover', () => {
                    this.menuPausa.boton3.setScale(escalaBoton * 1.1);}).on('pointerout', () => {
                        this.menuPausa.boton3.setScale(escalaBoton);});
            
            this.sound.pauseAll();
            this.jugador.anims?.pause();
            this.jugador2.anims?.pause();
            
        } else {
            this.reanudarJuego();
        }
    }
    
    reanudarJuego() {
        
        this.physics.resume();
        this.botonPausa.setTexture('botonPausa');
        this.juegoPausado = false;
        
        
        if (this.menuPausa.fondo) this.menuPausa.fondo.destroy();
        if (this.menuPausa.boton1) this.menuPausa.boton1.destroy();
        if (this.menuPausa.boton2) this.menuPausa.boton2.destroy();
        if (this.menuPausa.boton3) this.menuPausa.boton3.destroy();
        
        
        this.sound.resumeAll();
        this.jugador.anims?.resume();
        this.jugador2.anims?.resume();
        
    }
    

    update() {
        if (!this.juegoIniciado || this.juegoPausado) return;
        
        const tiempoActual = this.time.now;
        
        if (this.estaEnDanoJugador && tiempoActual - this.tiempoEnDanoJugador > 2000) {
            this.aplicarDanoReal('jugador1');
            this.tiempoEnDanoJugador = tiempoActual;
        }
        
        if (this.estaEnDanoJugador2 && tiempoActual - this.tiempoEnDanoJugador2 > 2000) {
            this.aplicarDanoReal('jugador2');
            this.tiempoEnDanoJugador2 = tiempoActual;
        }

        // Movimiento y disparo del Villano 1
        if (this.villano && this.villano.active) {
            const velocidadVillano = 80;
            
            if (this.villano.body.velocity.x === 0) {
                this.villano.setVelocityX(velocidadVillano);
            }
            
            if (this.villano.x >= this.villano.movementBounds.right) {
                this.villano.setVelocityX(-velocidadVillano);
            } 
            else if (this.villano.x <= this.villano.movementBounds.left) {
                this.villano.setVelocityX(velocidadVillano);
            }
            
            //this.dispararVillano1();
        }

        // Movimiento y disparo del Villano 2
        if (this.villano2 && this.villano2.active) {
            const velocidadVillano = 80;
            
            if (this.villano2.body.velocity.x === 0) {
                this.villano2.setVelocityX(-velocidadVillano);
            }
            
            if (this.villano2.x <= this.villano2.movementBounds.left) {
                this.villano2.setVelocityX(velocidadVillano);
            } 
            else if (this.villano2.x >= this.villano2.movementBounds.right) {
                this.villano2.setVelocityX(-velocidadVillano);
            }
            
            //this.dispararVillano2();
        }

    // Movimiento del Villano Final
if (this.villanoFinal && this.villanoFinal.active) {
    const velocidadVillano = 80;
    
    if (this.villanoFinal.body.velocity.x === 0) {
        this.villanoFinal.setVelocityX(-velocidadVillano);
    }
    
    if (this.villanoFinal.x <= this.villanoFinal.movementBounds.left) {
        this.villanoFinal.setVelocityX(velocidadVillano);
    } 
    else if (this.villanoFinal.x >= this.villanoFinal.movementBounds.right) {
        this.villanoFinal.setVelocityX(-velocidadVillano);
    }

    if (this.villanoFinal.body.velocity.x !== 0) {
        this.villanoFinal.anims.play('villanoFinalWalk', true);
        this.villanoFinal.setFlipX(this.villanoFinal.body.velocity.x < 0);
    } else {
        this.villanoFinal.anims.play('villanoFinalIdle', true);
    }
}
        
    // Lógica de disparo del robot
        if (this.keyDisparo.isDown && !this.estaDisparando && !this.keyShield.isDown) {
            this.estaDisparando = true;
            
            // Reproducir animación de disparo
            this.jugador.anims.play('disparo1', true);
            this.dispararBala();
             this.ultimoDisparo = this.time.now;
             
             this.time.delayedCall(500, () => {
                this.estaDisparando = false;
                this.jugador.anims.play('idle1', true);
            });
        }
        
        if (this.keyDisparo.isDown && !this.keyShield.isDown && 
            this.time.now - this.ultimoDisparo > this.intervaloDisparo) {
            this.dispararBala();
            this.ultimoDisparo = this.time.now;
        }

  
        const speed = 160;
        let robotPuedeMover = true;
        let perroPuedeMover = true;
  
        const distancia = Math.abs(this.jugador.x - this.jugador2.x);
        if (distancia > 900) robotPuedeMover = this.jugador.x <= this.jugador2.x;
        if (distancia > 900) perroPuedeMover = this.jugador2.x <= this.jugador.x;
  
        if (this.keyShield.isDown) {
            this.jugador.setVisible(false);
            this.escudo.setPosition(this.jugador.x, this.jugador.y).setVisible(true);
        } else {
            this.jugador.setVisible(true);
            this.escudo.setVisible(false);
        }
  
        // Movimiento del Robot 
    this.jugador.setVelocityX(0);
    if (this.vidasJugador > 0 && robotPuedeMover && !this.keyShield.isDown && !this.estaDisparando) {
        if (this.keysWASD.left.isDown) {
            this.jugador.setVelocityX(-speed).anims.play('walk1', true).setFlipX(true);
        } else if (this.keysWASD.right.isDown) {
            this.jugador.setVelocityX(speed).anims.play('walk1', true).setFlipX(false);
        } else {
            this.jugador.anims.play('idle1', true);
        }
        if (this.keysWASD.up.isDown && this.jugador.body.blocked.down) {
            this.jugador.setVelocityY(-400);
        }
    } else if (!this.keyShield.isDown && !this.estaDisparando) {
        this.jugador.anims.play('idle1', true);
    }

    // Movimiento del Perro 
    this.jugador2.setVelocityX(0);
    if (this.vidasJugador2 > 0 && perroPuedeMover) {
        if (this.cursors.left.isDown) {
            this.jugador2.setVelocityX(-speed).anims.play('walk2Left', true);
            this.ultimaDireccionPerro = 'left';
        } else if (this.cursors.right.isDown) {
            this.jugador2.setVelocityX(speed).anims.play('walk2Right', true);
            this.ultimaDireccionPerro = 'right';
        } else {
            this.jugador2.anims.play(
                `idle2${this.ultimaDireccionPerro.charAt(0).toUpperCase() + this.ultimaDireccionPerro.slice(1)}`, 
                true
            );
        }
        if (this.cursors.up.isDown && this.jugador2.body.blocked.down) {
            this.jugador2.setVelocityY(-400);
        }
    } else {
        this.jugador2.anims.play(
            `idle2${this.ultimaDireccionPerro.charAt(0).toUpperCase() + this.ultimaDireccionPerro.slice(1)}`, 
            true
        );
    }
}
    // aca tenemos los metodos de colision 
    configurarColisionesCapas() {
        this.colisionSound = this.sound.add('colisionSonido');
    
        this.colliders = {
            6: {
                jugador: this.physics.add.collider(this.jugador, this.plataformaLayer6, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(6);
                }),
                jugador2: this.physics.add.collider(this.jugador2, this.plataformaLayer6, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(6);
                })
            },
            7: {
                jugador: this.physics.add.collider(this.jugador, this.plataformaLayer7, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(7);
                }),
                jugador2: this.physics.add.collider(this.jugador2, this.plataformaLayer7, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(7);
                })
            },
            8: {
                jugador: this.physics.add.collider(this.jugador, this.plataformaLayer8, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(8);
                }),
                jugador2: this.physics.add.collider(this.jugador2, this.plataformaLayer8, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(8);
                })
            },
            9: {
                jugador: this.physics.add.collider(this.jugador, this.plataformaLayer9, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(9);
                }),
                jugador2: this.physics.add.collider(this.jugador2, this.plataformaLayer9, () => {
                    this.colisionSound.play();
                    this.desactivarCapa(9);
                })
            }
        };
    }

    desactivarCapa(numeroCapa) {
        if (!this.capasActivas[numeroCapa]) return;

        const capa = this[`plataformaLayer${numeroCapa}`];
        if (!capa) return;

        capa.setCollisionByExclusion([-1], false);
        capa.setVisible(false);
        
        if (this.colliders[numeroCapa]) {
            this.colliders[numeroCapa].jugador.destroy();
            this.colliders[numeroCapa].jugador2.destroy();
        }
        
        this.capasActivas[numeroCapa] = false;
        this.cameras.main.flash(200, 50, 50, 50);
    }

    iniciarContactoDano(tipoJugador) {
        const tiempoActual = this.time.now;
        const jugador = tipoJugador === 'jugador1' ? this.jugador : this.jugador2;
        
        this.mostrarEfectoAdvertencia(jugador);
        
        if (tipoJugador === 'jugador1') {
            if (tiempoActual - this.ultimaColisionJugador < 500) {
                this.contadorColisionesJugador++;
            } else {
                this.contadorColisionesJugador = 1;
            }
            this.ultimaColisionJugador = tiempoActual;
            
            if (this.contadorColisionesJugador >= 4) {
                this.aplicarDanoReal(tipoJugador);
                this.contadorColisionesJugador = 0;
            }
            
            this.estaEnDanoJugador = true;
            this.tiempoEnDanoJugador = tiempoActual;
        } else {
            if (tiempoActual - this.ultimaColisionJugador2 < 500) {
                this.contadorColisionesJugador2++;
            } else {
                this.contadorColisionesJugador2 = 1;
            }
            this.ultimaColisionJugador2 = tiempoActual;
            
            if (this.contadorColisionesJugador2 >= 4) {
                this.aplicarDanoReal(tipoJugador);
                this.contadorColisionesJugador2 = 0;
            }
            
            this.estaEnDanoJugador2 = true;
            this.tiempoEnDanoJugador2 = tiempoActual;
        }
    }
  
    finalizarContactoDano(tipoJugador) {
        if (tipoJugador === 'jugador1') {
            this.estaEnDanoJugador = false;
        } else {
            this.estaEnDanoJugador2 = false;
        }
    }
  
    mostrarEfectoAdvertencia(jugador) {
        jugador.setTint(0xff0000);
        this.time.delayedCall(200, () => jugador.clearTint());
    }
  
    aplicarDanoReal(tipoJugador) {
        if ((tipoJugador === 'jugador1' && this.invulnerableJugador) || 
            (tipoJugador === 'jugador2' && this.invulnerableJugador2)) {
            return;
        }
  
        if (tipoJugador === 'jugador1') {
            this.vidasJugador--;
            this.invulnerableJugador = true;
        } else {
            this.vidasJugador2--;
            this.invulnerableJugador2 = true;
        }
  
        this.actualizarBarraVida(tipoJugador);
  
        const jugador = tipoJugador === 'jugador1' ? this.jugador : this.jugador2;
        jugador.setTint(0xff0000);
        
        this.tweens.add({
            targets: jugador,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                jugador.clearTint();
                jugador.setAlpha(1);
                if (tipoJugador === 'jugador1') {
                    this.invulnerableJugador = false;
                } else {
                    this.invulnerableJugador2 = false;
                }
            }
        });
  
        if ((tipoJugador === 'jugador1' && this.vidasJugador <= 0) || 
            (tipoJugador === 'jugador2' && this.vidasJugador2 <= 0)) {
            this.mostrarMensaje(`${tipoJugador === 'jugador1' ? 'Robot' : 'Perro'} Eliminado`, 400, 300);
        }
    }
  
    actualizarBarraVida(tipoJugador) {
        const vidas = tipoJugador === 'jugador1' ? this.vidasJugador : this.vidasJugador2;
        const barraVida = tipoJugador === 'jugador1' ? this.barraVidaJugador : this.barraVidaJugador2;
        
        switch(vidas) {
            case 5: barraVida.setTexture('vida100'); break;
            case 4: barraVida.setTexture('vida80'); break;
            case 3: barraVida.setTexture('vida60'); break;
            case 2: barraVida.setTexture('vida40'); break;
            case 1: barraVida.setTexture('vida20'); break;
            case 0: barraVida.setTexture('vida0'); break;
        }
  
        this.tweens.add({
            targets: barraVida,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 100,
            yoyo: true
        });
    }

    //  la ventana emergte del boton 
    activarVentanaEmergente() {
        if (!this.ventanaActiva && this.intentosRestantes > 0) {
            this.ventanaActiva = true;
            this.botonCollider.active = false;
            
            this.ventanaEmergente.setVisible(true);
            this.boton1.setVisible(true);
            this.boton2.setVisible(true);
            this.boton3.setVisible(true);
            this.mensajeVentana.setVisible(false);
            
            this.jugador.setVelocity(0);
            this.jugador2.setVelocity(0);
        }
    }

    cerrarVentanaEmergente() {
        this.ventanaEmergente.setVisible(false);
        this.boton1.setVisible(false);
        this.boton2.setVisible(false);
        this.boton3.setVisible(false);
        this.mensajeVentana.setVisible(false);
        this.ventanaActiva = false;
        
        if (this.intentosRestantes > 0) {
            this.botonCollider.active = true;
        }
        
        this.jugador.setVelocityX(this.jugador.body.velocity.x);
        this.jugador2.setVelocityX(this.jugador2.body.velocity.x);
    }

    manejarBotonCorrecto() {
        this.mensajeVentana.setText('Bien').setVisible(true);
        
        this.time.delayedCall(1500, () => {
            this.cerrarVentanaEmergente();
            this.botonCollider.destroy();
            this.plataformaLayer2.setVisible(false).setAlpha(0);
            this.plataformaLayer2.setCollisionByExclusion([-1], false);
        });
    }
    
    manejarBotonIncorrecto() {
        this.intentosRestantes--;
        
        if (this.intentosRestantes >= 0) {
            this.mensajeVentana.setText('Tienes una oportunidad más\npara liberar a CORE').setVisible(true);
            
            if (this.intentosRestantes === 0) {
                this.time.delayedCall(2000, () => {
                    this.mensajeVentana.setText('Has fallado todas las oportunidades\n CORE recibirá daño').setVisible(true);
                    
                    this.time.delayedCall(2000, () => {
                        this.aplicarDanoReal('jugador1');
                        this.cerrarVentanaEmergente();
                    });
                });
            }
        }
    }

    mostrarMensaje(texto, x, y) {
        const mensaje = this.add.text(x, y, texto, { 
            fontSize: '32px', 
            fill: '#fff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            align: 'center'
        }).setOrigin(0.5);
        
        this.time.delayedCall(2000, () => mensaje.destroy());
    }
}