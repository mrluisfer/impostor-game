import type { Category } from '../types/game';

export const categories: Category[] = [
  // ═══════════════════════════════════════════════════════════════
  // 🇲🇽 CATEGORÍAS MEXICANAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'comida-mexicana',
    name: 'Comida Mexicana',
    emoji: '🌮',
    words: [
      {
        word: 'Tacos al pastor',
        clues: ['Lleva carne en trompo', 'Se come con piña', 'Es de tortilla'],
      },
      {
        word: 'Pozole',
        clues: ['Es un caldo', 'Lleva maíz cacahuazintle', 'Se come en fiestas patrias'],
      },
      {
        word: 'Tamales',
        clues: ['Van envueltos en hoja', 'Se comen en Candelaria', 'Pueden ser de dulce o salado'],
      },
      {
        word: 'Enchiladas',
        clues: ['Llevan salsa encima', 'Son tortillas enrolladas', 'Pueden ser verdes o rojas'],
      },
      {
        word: 'Chilaquiles',
        clues: ['Se comen en el desayuno', 'Son totopos con salsa', 'Llevan crema y queso'],
      },
      {
        word: 'Mole',
        clues: ['Es una salsa espesa', 'Lleva chocolate', 'Es típico de Oaxaca y Puebla'],
      },
      {
        word: 'Carnitas',
        clues: ['Es carne de cerdo', 'Se fríe en su propia grasa', 'Es típico de Michoacán'],
      },
      {
        word: 'Birria',
        clues: ['Es un guiso de carne', 'Se come con consomé', 'Es típica de Jalisco'],
      },
      {
        word: 'Tlayudas',
        clues: ['Es una tortilla grande', 'Es típica de Oaxaca', 'Lleva asiento y frijoles'],
      },
      {
        word: 'Gorditas',
        clues: ['Son de masa gruesa', 'Se rellenan', 'Se abren por la mitad'],
      },
      {
        word: 'Sopes',
        clues: ['Tienen orilla pellizcada', 'Son de masa', 'Llevan frijoles y crema'],
      },
      {
        word: 'Quesadillas',
        clues: ['Llevan queso', 'Son de tortilla doblada', 'Se pueden freír'],
      },
      {
        word: 'Tostadas',
        clues: ['Son tortillas crujientes', 'Se les pone encima ingredientes', 'Son planas'],
      },
      {
        word: 'Elote',
        clues: ['Es maíz en mazorca', 'Se come en la calle', 'Lleva mayonesa y chile'],
      },
      {
        word: 'Esquites',
        clues: ['Son granos de maíz', 'Se sirven en vaso', 'Llevan limón y chile'],
      },
      {
        word: 'Tortas ahogadas',
        clues: ['Son de Guadalajara', 'Se bañan en salsa', 'Llevan carnitas'],
      },
      {
        word: 'Cochinita pibil',
        clues: ['Es de Yucatán', 'Es cerdo en achiote', 'Se cocina bajo tierra'],
      },
      {
        word: 'Barbacoa',
        clues: ['Se cocina en hoyo', 'Es carne de borrego o res', 'Se come los domingos'],
      },
      {
        word: 'Menudo',
        clues: ['Es un caldo', 'Lleva panza de res', 'Se come para la cruda'],
      },
      {
        word: 'Chiles en nogada',
        clues: ['Son tricolores', 'Llevan nuez de castilla', 'Se comen en septiembre'],
      },
    ],
  },
  {
    id: 'estados-mexico',
    name: 'Estados de México',
    emoji: '🗺️',
    words: [
      {
        word: 'Jalisco',
        clues: ['De ahí es el tequila', 'Guadalajara es su capital', 'Tiene mariachi'],
      },
      {
        word: 'Oaxaca',
        clues: ['Tiene muchos moles', 'Tiene playas y montañas', 'Es conocido por mezcal'],
      },
      {
        word: 'Yucatán',
        clues: ['Tiene cenotes', 'Está en la península', 'Chichén Itzá está ahí'],
      },
      {
        word: 'Michoacán',
        clues: ['De ahí son las carnitas', 'Tiene el lago de Pátzcuaro', 'Mariposas monarca llegan ahí'],
      },
      {
        word: 'Guanajuato',
        clues: ['Tiene callejones', 'Es colorido', 'Tiene momias famosas'],
      },
      {
        word: 'Veracruz',
        clues: ['Tiene puerto', 'Es jarocho', 'Tiene café y vainilla'],
      },
      {
        word: 'Puebla',
        clues: ['Tiene talavera', 'De ahí son los chiles en nogada', 'Tiene volcanes cerca'],
      },
      {
        word: 'Nuevo León',
        clues: ['Monterrey es su capital', 'Tiene el Cerro de la Silla', 'Es industrial'],
      },
      {
        word: 'Chiapas',
        clues: ['Tiene selva', 'Tiene ruinas mayas', 'San Cristóbal está ahí'],
      },
      {
        word: 'Quintana Roo',
        clues: ['Tiene a Cancún', 'Tiene caribe mexicano', 'Tiene Tulum'],
      },
      {
        word: 'Sonora',
        clues: ['Es desértico', 'Tiene carne asada famosa', 'Está en el norte'],
      },
      {
        word: 'Sinaloa',
        clues: ['Tiene mariscos', 'Mazatlán está ahí', 'Tiene banda sinaloense'],
      },
      {
        word: 'Baja California',
        clues: ['Tiene frontera con USA', 'Tijuana está ahí', 'Tiene viñedos'],
      },
      {
        word: 'Guerrero',
        clues: ['Tiene Acapulco', 'Tiene costa', 'Tiene Taxco'],
      },
      {
        word: 'Chihuahua',
        clues: ['Es el estado más grande', 'Tiene Barrancas del Cobre', 'Tiene desierto'],
      },
    ],
  },
  {
    id: 'dulces-mexicanos',
    name: 'Dulces Mexicanos',
    emoji: '🍬',
    words: [
      {
        word: 'Mazapán',
        clues: ['Es de cacahuate', 'Se deshace fácil', 'Viene en circulito'],
      },
      {
        word: 'Pulparindo',
        clues: ['Es de tamarindo', 'Es enchilado', 'Es como una barrita'],
      },
      {
        word: 'Lucas',
        clues: ['Es polvo enchilado', 'Viene en botecito', 'Se lame'],
      },
      {
        word: 'Pelón Pelo Rico',
        clues: ['Sale en tiritas', 'Es de tamarindo', 'Se aprieta para que salga'],
      },
      {
        word: 'Duvalín',
        clues: ['Es cremoso', 'Viene con palita', 'Tiene dos sabores'],
      },
      {
        word: 'Bubulubu',
        clues: ['Tiene chocolate', 'Tiene malvavisco', 'Tiene fresa'],
      },
      {
        word: 'Paleta Payaso',
        clues: ['Tiene cara', 'Es de malvavisco', 'Tiene chocolate'],
      },
      {
        word: 'Rockaleta',
        clues: ['Es paleta', 'Tiene chicle adentro', 'Tiene capas'],
      },
      {
        word: 'Vero Mango',
        clues: ['Es paleta', 'Tiene chile', 'Sabe a mango'],
      },
      {
        word: 'Obleas',
        clues: ['Son redondas y planas', 'Tienen cajeta', 'Son crujientes'],
      },
      {
        word: 'Cocada',
        clues: ['Es de coco', 'Es dulce', 'Puede ser blanca o rosa'],
      },
      {
        word: 'Ate',
        clues: ['Es de fruta', 'Es como jalea firme', 'Se come con queso'],
      },
      {
        word: 'Glorias',
        clues: ['Son de leche quemada', 'Vienen envueltas', 'Son de Linares'],
      },
      {
        word: 'Jamoncillo',
        clues: ['Es de leche', 'Tiene nuez', 'Es como pasta dulce'],
      },
      {
        word: 'Palanqueta',
        clues: ['Es de cacahuate', 'Es crocante', 'Tiene piloncillo'],
      },
    ],
  },
  {
    id: 'tradiciones-mexicanas',
    name: 'Tradiciones Mexicanas',
    emoji: '💀',
    words: [
      {
        word: 'Día de Muertos',
        clues: ['Se pone altar', 'Es el 1 y 2 de noviembre', 'Se visitan panteones'],
      },
      {
        word: 'Posadas',
        clues: ['Son en diciembre', 'Se pide posada cantando', 'Hay piñata'],
      },
      {
        word: 'Grito de Independencia',
        clues: ['Es el 15 de septiembre', 'El presidente lo da', 'Se grita ¡Viva México!'],
      },
      {
        word: 'Rosca de Reyes',
        clues: ['Es el 6 de enero', 'Tiene muñequitos', 'Quien saca el niño paga tamales'],
      },
      {
        word: 'Quinceañera',
        clues: ['Es fiesta de 15 años', 'Hay vals', 'La festejada usa vestido'],
      },
      {
        word: 'Piñata',
        clues: ['Se rompe con palo', 'Tiene dulces', 'Se usa en posadas'],
      },
      {
        word: 'Pastorela',
        clues: ['Es obra de teatro', 'Es en navidad', 'Tiene diablos y ángeles'],
      },
      {
        word: 'Día de la Candelaria',
        clues: ['Es el 2 de febrero', 'Se llevan niños a bendecir', 'Se comen tamales'],
      },
      {
        word: 'Semana Santa',
        clues: ['Es antes de Pascua', 'Hay procesiones', 'No se come carne'],
      },
      {
        word: 'Guelaguetza',
        clues: ['Es en Oaxaca', 'Hay baile', 'Es en julio'],
      },
      {
        word: 'Mariachi',
        clues: ['Usan traje de charro', 'Tocan trompeta y violín', 'Cantan rancheras'],
      },
      {
        word: 'Lucha libre',
        clues: ['Usan máscaras', 'Pelean en ring', 'Hay técnicos y rudos'],
      },
      {
        word: 'Altar de muertos',
        clues: ['Tiene fotos de difuntos', 'Lleva comida y veladoras', 'Se pone en noviembre'],
      },
      {
        word: 'Pan de muerto',
        clues: ['Es redondo', 'Tiene huesitos de masa', 'Se come en noviembre'],
      },
      {
        word: 'Cempasúchil',
        clues: ['Es flor naranja', 'Se usa en altares', 'Guía a los muertos'],
      },
    ],
  },
  {
    id: 'bebidas-mexicanas',
    name: 'Bebidas Mexicanas',
    emoji: '🍺',
    words: [
      {
        word: 'Agua de horchata',
        clues: ['Es blanca', 'Es de arroz', 'Lleva canela'],
      },
      {
        word: 'Jamaica',
        clues: ['Es roja/morada', 'Es de flor', 'Es agua fresca'],
      },
      {
        word: 'Tequila',
        clues: ['Es de agave', 'Es de Jalisco', 'Se toma con limón y sal'],
      },
      {
        word: 'Mezcal',
        clues: ['Tiene gusano', 'Es de Oaxaca', 'Es de maguey'],
      },
      {
        word: 'Michelada',
        clues: ['Es cerveza preparada', 'Lleva limón y salsa', 'Se sirve en tarro escarchado'],
      },
      {
        word: 'Café de olla',
        clues: ['Lleva canela', 'Se hace en olla de barro', 'Lleva piloncillo'],
      },
      {
        word: 'Atole',
        clues: ['Es espeso', 'Es de maíz', 'Se toma caliente'],
      },
      {
        word: 'Champurrado',
        clues: ['Es atole de chocolate', 'Se toma en invierno', 'Acompaña los tamales'],
      },
      {
        word: 'Pulque',
        clues: ['Es de maguey', 'Es prehispánico', 'Es baboso'],
      },
      {
        word: 'Tepache',
        clues: ['Es de piña fermentada', 'Es dulce', 'Tiene poca graduación'],
      },
      {
        word: 'Ponche',
        clues: ['Se toma en navidad', 'Lleva frutas', 'Es caliente'],
      },
      {
        word: 'Rompope',
        clues: ['Es de huevo', 'Lo hacían las monjas', 'Lleva alcohol'],
      },
      {
        word: 'Jarritos',
        clues: ['Es refresco', 'Tiene muchos sabores', 'La botella es de vidrio'],
      },
      {
        word: 'Sidral Mundet',
        clues: ['Sabe a manzana', 'Es refresco', 'Es dulce'],
      },
      {
        word: 'Corona',
        clues: ['Es cerveza', 'Se toma con limón', 'Es muy conocida'],
      },
    ],
  },
  {
    id: 'lugares-mexico',
    name: 'Lugares de México',
    emoji: '🏛️',
    words: [
      {
        word: 'Teotihuacán',
        clues: ['Tiene pirámides', 'Está cerca de CDMX', 'Tiene pirámide del Sol'],
      },
      {
        word: 'Chichén Itzá',
        clues: ['Tiene a Kukulkán', 'Es maravilla del mundo', 'Está en Yucatán'],
      },
      {
        word: 'Zócalo',
        clues: ['Es plaza principal', 'Está en CDMX', 'Tiene catedral'],
      },
      {
        word: 'Xochimilco',
        clues: ['Tiene trajineras', 'Tiene chinampas', 'Está en CDMX'],
      },
      {
        word: 'Cancún',
        clues: ['Tiene playa caribeña', 'Tiene zona hotelera', 'Está en Quintana Roo'],
      },
      {
        word: 'Guanajuato Centro',
        clues: ['Tiene callejón del beso', 'Es colorido', 'Tiene túneles'],
      },
      {
        word: 'San Miguel de Allende',
        clues: ['Es pueblo mágico', 'Tiene parroquia rosa', 'Es colonial'],
      },
      {
        word: 'Tulum',
        clues: ['Tiene ruinas en la playa', 'Está en la Riviera Maya', 'Es zona arqueológica'],
      },
      {
        word: 'Chapultepec',
        clues: ['Tiene castillo', 'Es parque grande', 'Está en CDMX'],
      },
      {
        word: 'Coyoacán',
        clues: ['Vivió Frida Kahlo', 'Tiene centro histórico', 'Está en CDMX'],
      },
      {
        word: 'Taxco',
        clues: ['Es de plata', 'Está en Guerrero', 'Es pueblo mágico'],
      },
      {
        word: 'Acapulco',
        clues: ['Tiene clavadistas', 'Es puerto', 'Está en Guerrero'],
      },
      {
        word: 'Cenotes',
        clues: ['Son pozos naturales', 'Están en Yucatán', 'Tienen agua cristalina'],
      },
      {
        word: 'Hierve el Agua',
        clues: ['Parece cascada petrificada', 'Está en Oaxaca', 'Tiene pozas naturales'],
      },
      {
        word: 'Palenque',
        clues: ['Es zona arqueológica maya', 'Está en Chiapas', 'Tiene templos en selva'],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════
  // 🌍 CATEGORÍAS GENERALES
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'peliculas-famosas',
    name: 'Películas Famosas',
    emoji: '🎬',
    words: [
      {
        word: 'Titanic',
        clues: ['Se hunde un barco', 'Hay historia de amor', 'Jack y Rose'],
      },
      {
        word: 'El Padrino',
        clues: ['Es de mafia italiana', 'Marlon Brando actúa', 'Tiene oferta que no puedes rechazar'],
      },
      {
        word: 'Star Wars',
        clues: ['Hay espadas láser', 'Tiene a Darth Vader', 'Es en el espacio'],
      },
      {
        word: 'Harry Potter',
        clues: ['Hay magia', 'Es sobre un niño mago', 'Hogwarts es la escuela'],
      },
      {
        word: 'Avatar',
        clues: ['Son azules', 'Es en Pandora', 'James Cameron la dirigió'],
      },
      {
        word: 'Jurassic Park',
        clues: ['Hay dinosaurios', 'Es en una isla', 'Spielberg la dirigió'],
      },
      {
        word: 'El Rey León',
        clues: ['Es de Disney', 'Simba es protagonista', 'Hakuna Matata'],
      },
      {
        word: 'Matrix',
        clues: ['Hay pastilla roja y azul', 'Neo es el elegido', 'Esquivan balas'],
      },
      {
        word: 'Toy Story',
        clues: ['Es de Pixar', 'Los juguetes hablan', 'Woody y Buzz'],
      },
      {
        word: 'Coco',
        clues: ['Es de Día de Muertos', 'Es de Pixar', 'Recuérdame es la canción'],
      },
      {
        word: 'Frozen',
        clues: ['Tiene Elsa y Anna', 'Let it go', 'Es de Disney'],
      },
      {
        word: 'Los Vengadores',
        clues: ['Son superhéroes', 'Es de Marvel', 'Thanos es villano'],
      },
      {
        word: 'Volver al Futuro',
        clues: ['Hay viajes en el tiempo', 'Tiene DeLorean', 'Doc y Marty'],
      },
      {
        word: 'Forrest Gump',
        clues: ['La vida es como caja de chocolates', 'Tom Hanks actúa', 'Corre mucho'],
      },
      {
        word: 'El Exorcista',
        clues: ['Es de terror', 'Una niña está poseída', 'Su cabeza gira'],
      },
    ],
  },
  {
    id: 'deportes',
    name: 'Deportes',
    emoji: '⚽',
    words: [
      {
        word: 'Fútbol',
        clues: ['Se juega con balón', 'Tiene portería', '11 jugadores por equipo'],
      },
      {
        word: 'Básquetbol',
        clues: ['Se encesta', 'Cancha con aros', 'NBA es la liga famosa'],
      },
      {
        word: 'Béisbol',
        clues: ['Tiene bat', 'Se lanzan strikes', 'Tiene diamante'],
      },
      {
        word: 'Tenis',
        clues: ['Tiene raqueta', 'Se juega en cancha', 'Wimbledon es torneo'],
      },
      {
        word: 'Natación',
        clues: ['Es en agua', 'Hay diferentes estilos', 'Se usa alberca'],
      },
      {
        word: 'Boxeo',
        clues: ['Se usan guantes', 'Hay rounds', 'Pelean en ring'],
      },
      {
        word: 'Golf',
        clues: ['Se usa palo', 'Hay hoyos', 'Tiene green'],
      },
      {
        word: 'Voleibol',
        clues: ['Se pasa sobre red', 'Tiene sets', 'Se puede jugar en playa'],
      },
      {
        word: 'Atletismo',
        clues: ['Hay carreras', 'Hay saltos y lanzamientos', 'Es olímpico'],
      },
      {
        word: 'Ciclismo',
        clues: ['Se usa bicicleta', 'Tour de Francia', 'Hay de ruta y montaña'],
      },
      {
        word: 'Gimnasia',
        clues: ['Hay acrobacias', 'Usan aparatos', 'Hay artística y rítmica'],
      },
      {
        word: 'Lucha',
        clues: ['Es cuerpo a cuerpo', 'Hay grecorromana', 'Se hace en tapete'],
      },
      {
        word: 'Karate',
        clues: ['Es arte marcial', 'Hay cinturones', 'Es de Japón'],
      },
      {
        word: 'Surf',
        clues: ['Se hace en olas', 'Usa tabla', 'Es en el mar'],
      },
      {
        word: 'Esquí',
        clues: ['Es en nieve', 'Usa tablas en pies', 'Se baja montaña'],
      },
    ],
  },
  {
    id: 'animales',
    name: 'Animales',
    emoji: '🦁',
    words: [
      {
        word: 'León',
        clues: ['Es el rey de la selva', 'Tiene melena', 'Es felino'],
      },
      {
        word: 'Elefante',
        clues: ['Tiene trompa', 'Es el más grande terrestre', 'Tiene colmillos'],
      },
      {
        word: 'Delfín',
        clues: ['Vive en el mar', 'Es muy inteligente', 'Hace sonidos'],
      },
      {
        word: 'Águila',
        clues: ['Es ave rapaz', 'Está en el escudo mexicano', 'Tiene vista aguda'],
      },
      {
        word: 'Serpiente',
        clues: ['No tiene patas', 'Algunas son venenosas', 'Es reptil'],
      },
      {
        word: 'Tiburón',
        clues: ['Vive en el mar', 'Tiene muchos dientes', 'Es depredador'],
      },
      {
        word: 'Mariposa',
        clues: ['Tiene alas coloridas', 'Era oruga', 'La monarca migra a México'],
      },
      {
        word: 'Oso',
        clues: ['Hiberna', 'Puede ser pardo o polar', 'Come miel'],
      },
      {
        word: 'Caballo',
        clues: ['Se monta', 'Tiene herradura', 'Relincha'],
      },
      {
        word: 'Perro',
        clues: ['Es mascota común', 'Ladra', 'Es el mejor amigo del hombre'],
      },
      {
        word: 'Gato',
        clues: ['Maúlla', 'Tiene bigotes', 'Caza ratones'],
      },
      {
        word: 'Tortuga',
        clues: ['Tiene caparazón', 'Es lenta', 'Puede ser marina o terrestre'],
      },
      {
        word: 'Cocodrilo',
        clues: ['Es reptil', 'Vive en pantanos', 'Tiene mandíbula fuerte'],
      },
      {
        word: 'Mono',
        clues: ['Vive en árboles', 'Es primate', 'Come plátanos'],
      },
      {
        word: 'Pingüino',
        clues: ['No vuela', 'Vive en el frío', 'Es ave'],
      },
    ],
  },
  {
    id: 'profesiones',
    name: 'Profesiones',
    emoji: '👨‍⚕️',
    words: [
      {
        word: 'Médico',
        clues: ['Trabaja en hospital', 'Cura enfermos', 'Usa bata blanca'],
      },
      {
        word: 'Maestro',
        clues: ['Da clases', 'Trabaja en escuela', 'Enseña a estudiantes'],
      },
      {
        word: 'Abogado',
        clues: ['Defiende en juicios', 'Conoce las leyes', 'Trabaja en tribunales'],
      },
      {
        word: 'Ingeniero',
        clues: ['Diseña y construye', 'Resuelve problemas técnicos', 'Hay de muchos tipos'],
      },
      {
        word: 'Chef',
        clues: ['Cocina profesionalmente', 'Trabaja en restaurante', 'Usa gorro blanco'],
      },
      {
        word: 'Policía',
        clues: ['Protege ciudadanos', 'Usa uniforme', 'Persigue delincuentes'],
      },
      {
        word: 'Bombero',
        clues: ['Apaga incendios', 'Hace rescates', 'Usa casco y equipo'],
      },
      {
        word: 'Arquitecto',
        clues: ['Diseña edificios', 'Hace planos', 'Planea construcciones'],
      },
      {
        word: 'Veterinario',
        clues: ['Cura animales', 'Trabaja con mascotas', 'Es doctor de animales'],
      },
      {
        word: 'Piloto',
        clues: ['Vuela aviones', 'Usa uniforme', 'Está en la cabina'],
      },
      {
        word: 'Dentista',
        clues: ['Cuida los dientes', 'Usa taladro dental', 'Trabaja en consultorio'],
      },
      {
        word: 'Periodista',
        clues: ['Escribe noticias', 'Hace entrevistas', 'Trabaja en medios'],
      },
      {
        word: 'Contador',
        clues: ['Lleva las cuentas', 'Hace impuestos', 'Trabaja con números'],
      },
      {
        word: 'Programador',
        clues: ['Escribe código', 'Crea software', 'Trabaja con computadoras'],
      },
      {
        word: 'Actor',
        clues: ['Actúa en películas', 'Interpreta personajes', 'Trabaja en cine o teatro'],
      },
    ],
  },
  {
    id: 'musica',
    name: 'Música',
    emoji: '🎵',
    words: [
      {
        word: 'Guitarra',
        clues: ['Tiene cuerdas', 'Se rasguea', 'Puede ser eléctrica o acústica'],
      },
      {
        word: 'Piano',
        clues: ['Tiene teclas', 'Es blanco y negro', 'Es de cuerda percutida'],
      },
      {
        word: 'Batería',
        clues: ['Se toca con baquetas', 'Tiene platillos', 'Lleva el ritmo'],
      },
      {
        word: 'Violín',
        clues: ['Se toca con arco', 'Es de cuerda', 'Se pone en el hombro'],
      },
      {
        word: 'Trompeta',
        clues: ['Es de viento', 'Es dorada', 'Tiene pistones'],
      },
      {
        word: 'Saxofón',
        clues: ['Es de viento', 'Se usa en jazz', 'Tiene forma curva'],
      },
      {
        word: 'Flauta',
        clues: ['Es de viento', 'Se sopla de lado', 'Es delgada'],
      },
      {
        word: 'Acordeón',
        clues: ['Se estira y encoge', 'Tiene botones o teclas', 'Se usa en norteño'],
      },
      {
        word: 'Arpa',
        clues: ['Tiene muchas cuerdas', 'Es grande', 'Se toca con los dedos'],
      },
      {
        word: 'Maracas',
        clues: ['Se agitan', 'Son de percusión', 'Hacen ruido de semillas'],
      },
      {
        word: 'Bajo',
        clues: ['Tiene cuerdas gruesas', 'Da sonido grave', 'Se usa en bandas'],
      },
      {
        word: 'Congas',
        clues: ['Son tambores', 'Se tocan con las manos', 'Son de origen cubano'],
      },
      {
        word: 'Xilófono',
        clues: ['Tiene barras de madera', 'Se toca con mazos', 'Es de percusión'],
      },
      {
        word: 'Ukulele',
        clues: ['Es pequeño', 'Es de Hawái', 'Tiene 4 cuerdas'],
      },
      {
        word: 'Harmónica',
        clues: ['Se sopla', 'Es pequeña', 'Se usa en blues'],
      },
    ],
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    emoji: '💻',
    words: [
      {
        word: 'Smartphone',
        clues: ['Es un teléfono', 'Tiene pantalla táctil', 'Se usa para apps'],
      },
      {
        word: 'Laptop',
        clues: ['Es computadora portátil', 'Se puede plegar', 'Tiene teclado integrado'],
      },
      {
        word: 'Tablet',
        clues: ['Es como pantalla grande', 'Es táctil', 'Es portátil'],
      },
      {
        word: 'Smart TV',
        clues: ['Es televisión', 'Se conecta a internet', 'Tiene apps'],
      },
      {
        word: 'Audífonos',
        clues: ['Se ponen en las orejas', 'Sirven para escuchar', 'Pueden ser inalámbricos'],
      },
      {
        word: 'Smartwatch',
        clues: ['Es reloj inteligente', 'Se usa en la muñeca', 'Mide pasos y pulso'],
      },
      {
        word: 'Consola de videojuegos',
        clues: ['Sirve para jugar', 'Se conecta a TV', 'PlayStation y Xbox son ejemplos'],
      },
      {
        word: 'Drone',
        clues: ['Vuela', 'Se controla a distancia', 'Puede grabar video'],
      },
      {
        word: 'Router',
        clues: ['Da WiFi', 'Conecta a internet', 'Tiene antenas'],
      },
      {
        word: 'USB',
        clues: ['Guarda archivos', 'Es pequeño', 'Se conecta a computadora'],
      },
      {
        word: 'Cámara digital',
        clues: ['Toma fotos', 'Tiene lente', 'Guarda en memoria'],
      },
      {
        word: 'Bocina inteligente',
        clues: ['Reproduce música', 'Tiene asistente de voz', 'Alexa o Google'],
      },
      {
        word: 'E-reader',
        clues: ['Es para leer libros', 'Kindle es uno', 'Tiene tinta electrónica'],
      },
      {
        word: 'Power bank',
        clues: ['Carga dispositivos', 'Es portátil', 'Tiene batería'],
      },
      {
        word: 'Webcam',
        clues: ['Es cámara para computadora', 'Se usa en videollamadas', 'Se conecta por USB'],
      },
    ],
  },
];
