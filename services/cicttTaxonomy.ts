/**
 * CICTT Aviation Taxonomy Data
 * Complete CAST/ICAO Accident Prevention Taxonomy
 * 34 Occurrence Categories with Keywords for Incident Classification
 *
 * Reference: CAST Aviation Safety Committee Taxonomy
 * For aviation incident and accident classification and analysis
 */

export interface CICTTCategory {
  code: string;
  name: string;
  description: string;
  group: string;
  keywords: Record<string, number>;
}

// ============================================================================
// LOSS OF CONTROL CATEGORIES (4)
// ============================================================================

const LOC_I: CICTTCategory = {
  code: 'LOC-I',
  name: 'Loss of Control - In-flight',
  description:
    'Loss of aircraft control while in flight, or unintended deviation from intended flight path during normal flight envelope operations.',
  group: 'Loss of Control',
  keywords: {
    'loss of control': 10,
    stall: 9,
    spin: 9,
    upset: 8,
    uncontrolled: 8,
    'departed controlled flight': 10,
    'angle of attack': 7,
    'aerodynamic stall': 9,
    'deep stall': 10,
    'spiral dive': 8,
    'unusual attitude': 7,
    inverted: 6,
    'roll rate': 5,
    'pitch rate': 5,
    yaw: 4,
    'stick pusher': 6,
    'stick shaker': 6,
    recovery: 4,
    'spatial disorientation': 7,
    'pilot induced oscillation': 8,
  },
};

const LOC_G: CICTTCategory = {
  code: 'LOC-G',
  name: 'Loss of Control - Ground',
  description:
    'Loss of aircraft control while on the ground, including veering off runway, loss of directional control during taxi or landing roll.',
  group: 'Loss of Control',
  keywords: {
    'loss of control ground': 10,
    veering: 9,
    'directional control': 8,
    'ground handling': 7,
    'uncontrolled ground motion': 9,
    swerve: 8,
    'ground loop': 9,
    'tail strike': 6,
    'nose gear collapse': 7,
    'landing rollout': 6,
    crosswind: 5,
    'braking asymmetry': 7,
    'thrust reverser': 5,
    'steering failure': 8,
    hydroplane: 7,
    'wet runway': 4,
    'icy surface': 5,
    aquaplaning: 7,
    'ground divergence': 8,
    'stability loss': 7,
  },
};

const AMAN: CICTTCategory = {
  code: 'AMAN',
  name: 'Abnormal Maneuvering',
  description:
    'Maneuvering outside normal operational parameters or aircraft envelope, including aerobatic maneuvers or extreme attitudes not typical for intended operation.',
  group: 'Loss of Control',
  keywords: {
    'abnormal maneuvering': 10,
    'extreme maneuver': 9,
    'aggressive maneuver': 8,
    'unauthorized maneuver': 7,
    acrobatic: 8,
    'intentional spin': 8,
    'barrel roll': 6,
    'knife edge': 6,
    hammerhead: 7,
    loop: 5,
    'steep dive': 7,
    'slow flight': 4,
    'base to final turn': 3,
    'bank angle excessive': 8,
    'pitch excessive': 8,
    'airshow maneuver': 5,
    'unauthorized aerobatics': 9,
    'structural stress': 7,
    'g-force': 6,
    flutter: 8,
  },
};

// ============================================================================
// TERRAIN & OBSTACLE IMPACT CATEGORIES (3)
// ============================================================================

const CFIT: CICTTCategory = {
  code: 'CFIT',
  name: 'Controlled Flight into Terrain',
  description:
    'Aircraft in normal flight attitude and under crew control strikes terrain, obstacle, water, or other object, usually with no prior awareness of hazard.',
  group: 'Terrain/Obstacles',
  keywords: {
    'controlled flight into terrain': 10,
    CFIT: 10,
    'terrain strike': 9,
    mountain: 8,
    hill: 7,
    'ground contact': 9,
    'terrain awareness': 6,
    TAWS: 5,
    GPWS: 5,
    'terrain warning': 7,
    'descent below minimum': 8,
    'altitude loss': 7,
    'spatial disorientation': 7,
    'instrument failure': 5,
    'navigation error': 6,
    'chart error': 5,
    'non-precision approach': 4,
    'minimum descent altitude': 6,
    'decision height': 5,
    'terrain database': 4,
  },
};

const CTOL: CICTTCategory = {
  code: 'CTOL',
  name: 'Collision with Terrain on Takeoff/Landing',
  description:
    'Aircraft strikes terrain, obstacle, or water during takeoff or landing phase when crew is executing approach or departure procedures.',
  group: 'Terrain/Obstacles',
  keywords: {
    'collision terrain takeoff': 10,
    'collision terrain landing': 10,
    'takeoff crash': 9,
    'landing crash': 9,
    'obstacle strike': 8,
    'climb out': 6,
    'obstacle clearance': 6,
    'climb gradient': 6,
    'departure obstacle': 7,
    'approach obstacle': 7,
    'go-around': 4,
    'missed approach': 3,
    'instrument approach': 3,
    'visual approach': 2,
    'stabilized approach': 3,
    'unstable approach': 5,
    'altitude loss': 7,
    'descent rate': 6,
    'terrain clearance': 7,
    'low visibility': 5,
  },
};

const GCOL: CICTTCategory = {
  code: 'GCOL',
  name: 'Ground Collision',
  description:
    'Aircraft moving on surface strikes fixed or movable object while taxiing, or strikes parked aircraft, ground vehicle, or structure.',
  group: 'Terrain/Obstacles',
  keywords: {
    'ground collision': 10,
    'taxi collision': 9,
    'parked aircraft': 8,
    'ground equipment': 7,
    'ground vehicle': 7,
    'ramp accident': 7,
    pushback: 5,
    tug: 4,
    'ground handling': 6,
    parking: 4,
    gate: 3,
    'tow bar': 4,
    'visible range': 5,
    'wing strike': 8,
    'fuselage strike': 8,
    personnel: 5,
    obstacle: 6,
    clearance: 5,
    'poor visibility': 6,
    weather: 3,
  },
};

// ============================================================================
// RUNWAY EVENT CATEGORIES (4)
// ============================================================================

const RE: CICTTCategory = {
  code: 'RE',
  name: 'Runway Excursion',
  description:
    'Aircraft unintentionally leaves designated runway surface during takeoff, landing, or aborted takeoff, but remains in proximity of runway.',
  group: 'Runway Events',
  keywords: {
    'runway excursion': 10,
    'runway overrun': 9,
    'veer off': 9,
    'lateral excursion': 8,
    veering: 8,
    'departure surface': 9,
    'landing overrun': 9,
    'takeoff overrun': 9,
    'directional control': 7,
    braking: 6,
    'reverse thrust': 5,
    spoilers: 4,
    'wet runway': 5,
    'slippery surface': 6,
    aquaplane: 7,
    crosswind: 6,
    tailwind: 5,
    'grass overrun': 8,
    'runway end safety area': 6,
    'distance available': 5,
  },
};

const RI: CICTTCategory = {
  code: 'RI',
  name: 'Runway Incursion',
  description:
    'Any occurrence at an aerodrome involving the incorrect presence of an aircraft, vehicle, or person on the protected area of a surface designated for landing and take-off of aircraft.',
  group: 'Runway Events',
  keywords: {
    'runway incursion': 10,
    'runway violation': 9,
    'unauthorized runway entry': 9,
    'ground vehicle': 8,
    'aircraft on runway': 8,
    personnel: 7,
    'surface crossing': 8,
    'ATC clearance': 5,
    'taxi clearance': 5,
    'runway assignment': 5,
    'similar runway': 7,
    readback: 4,
    'pilot error': 6,
    'controller error': 6,
    'radio frequency': 5,
    'low visibility': 6,
    'night operation': 4,
    'parallel runways': 5,
    confusion: 7,
    signage: 4,
  },
};

const USOS: CICTTCategory = {
  code: 'USOS',
  name: 'Undershoot / Overshoot',
  description:
    'Aircraft lands short of runway (undershoot) or beyond runway end (overshoot), not classified as runway excursion.',
  group: 'Runway Events',
  keywords: {
    undershoot: 10,
    overshoot: 10,
    'short landing': 9,
    'landing short of runway': 10,
    'landing beyond runway': 10,
    'approach slope': 6,
    'glide slope': 6,
    'descent rate': 7,
    'altitude loss': 6,
    'flight path': 6,
    'descent planning': 5,
    stability: 5,
    'unstable approach': 6,
    'go-around': 3,
    'obstacle clearance': 5,
    visibility: 5,
    'wind shear': 7,
    crosswind: 5,
    tailwind: 6,
    'altitude call-out': 4,
  },
};

const ARC: CICTTCategory = {
  code: 'ARC',
  name: 'Abnormal Runway Contact',
  description:
    'Aircraft makes contact with runway surface in abnormal attitude, part, or location, such as nose gear first, tail strike, or wingtip contact.',
  group: 'Runway Events',
  keywords: {
    'abnormal runway contact': 10,
    'tail strike': 9,
    'tail scrape': 9,
    'nose gear first': 8,
    'wingtip contact': 8,
    'wing strike': 8,
    'engine strike': 8,
    'fuselage contact': 7,
    belly: 7,
    'gear up landing': 9,
    'landing gear': 8,
    'retracted gear': 8,
    'gear warning': 5,
    attitude: 6,
    'pitch attitude': 6,
    rotation: 5,
    'nose pitch up': 5,
    'excessive pitch': 6,
    'rotation rate': 5,
    touchdown: 4,
  },
};

// ============================================================================
// SYSTEM FAILURE CATEGORIES (3)
// ============================================================================

const SCF_PP: CICTTCategory = {
  code: 'SCF-PP',
  name: 'System Component Failure - Powerplant',
  description:
    'Engine failure, propeller failure, or fuel system failure resulting in loss of engine thrust or inability to manage power.',
  group: 'System Failures',
  keywords: {
    'engine failure': 10,
    'powerplant failure': 10,
    propeller: 8,
    'fuel system': 8,
    'thrust loss': 9,
    'power loss': 9,
    flameout: 9,
    'compressor stall': 8,
    'turbine failure': 8,
    'bearing failure': 7,
    overtemp: 8,
    overpressure: 7,
    'fuel starvation': 9,
    'fuel exhaustion': 9,
    'fuel contamination': 8,
    'fuel pump': 7,
    'fuel selector': 7,
    'multi-engine failure': 10,
    'dual failure': 10,
    'catastrophic failure': 10,
  },
};

const SCF_NP: CICTTCategory = {
  code: 'SCF-NP',
  name: 'System Component Failure - Non-Powerplant',
  description:
    'Failure of systems other than powerplant including hydraulic, electrical, flight controls, landing gear, or avionics systems.',
  group: 'System Failures',
  keywords: {
    'system failure': 10,
    'hydraulic failure': 9,
    'electrical failure': 9,
    'flight control failure': 9,
    'landing gear': 8,
    'gear extension': 8,
    'gear retraction': 8,
    'brake failure': 8,
    'flight surface': 8,
    aileron: 7,
    elevator: 7,
    rudder: 7,
    'control surface': 8,
    'avionics failure': 7,
    autopilot: 6,
    'navigation system': 6,
    communications: 6,
    pressurization: 7,
    'environmental control': 6,
    'instrument failure': 7,
  },
};

const FUEL: CICTTCategory = {
  code: 'FUEL',
  name: 'Fuel Related',
  description:
    'Fuel exhaustion, fuel starvation, fuel contamination, or fuel system configuration error affecting aircraft performance or safety.',
  group: 'System Failures',
  keywords: {
    'fuel exhaustion': 10,
    'fuel starvation': 10,
    'fuel contamination': 9,
    'fuel system': 8,
    'fuel depletion': 9,
    'fuel management': 7,
    'fuel pumps': 7,
    'fuel quantity': 7,
    'fuel selector': 7,
    'fuel transfer': 6,
    'cross-feed': 6,
    'fuel density': 6,
    'freezing fuel': 7,
    'water in fuel': 8,
    'fuel quality': 6,
    'fuel weight': 5,
    'center of gravity': 5,
    'fuel reserves': 6,
    'alternate fuel': 5,
    'emergency fuel': 4,
  },
};

// ============================================================================
// FIRE/SMOKE CATEGORIES (2)
// ============================================================================

const F_NI: CICTTCategory = {
  code: 'F-NI',
  name: 'Fire / Smoke - Non-Impact',
  description:
    'Fire, smoke, or hazardous fumes in aircraft cabin, cockpit, or engine compartment during flight, not resulting from impact or other accident.',
  group: 'Fire/Smoke',
  keywords: {
    fire: 10,
    smoke: 9,
    'cabin fire': 10,
    'cockpit fire': 10,
    'engine fire': 10,
    'cargo fire': 9,
    'electrical fire': 9,
    'thermal fire': 8,
    combustion: 8,
    flames: 9,
    'smoke detection': 6,
    'smoke indication': 6,
    'false alarm': 3,
    'smell smoke': 7,
    odor: 5,
    fumes: 8,
    'smoke evacuation': 5,
    'fire suppression': 6,
    extinguisher: 5,
    halon: 4,
  },
};

const F_POST: CICTTCategory = {
  code: 'F-POST',
  name: 'Fire / Smoke - Post-Impact',
  description:
    'Fire or smoke in aircraft following impact with terrain, water, or other object; fire resulting from accident damage.',
  group: 'Fire/Smoke',
  keywords: {
    'post-impact fire': 10,
    'fire after impact': 10,
    'wreckage fire': 9,
    'fuel fire': 9,
    'post-crash fire': 10,
    'impact damage': 8,
    'fuel spillage': 8,
    ignition: 7,
    'combustible material': 6,
    evacuation: 8,
    'emergency exit': 7,
    'evacuation slide': 6,
    burnout: 7,
    destruction: 6,
    remains: 4,
    'evidence loss': 5,
    'thermal damage': 7,
    'cabin destruction': 7,
    fatality: 6,
    survival: 3,
  },
};

// ============================================================================
// WEATHER/ENVIRONMENT CATEGORIES (3)
// ============================================================================

const TURB: CICTTCategory = {
  code: 'TURB',
  name: 'Turbulence Encounter',
  description:
    'Encounter with moderate, severe, or extreme turbulence during flight resulting in structural damage, injury to personnel, or loss of control.',
  group: 'Weather/Environment',
  keywords: {
    turbulence: 10,
    'severe turbulence': 9,
    'extreme turbulence': 10,
    'moderate turbulence': 7,
    'clear air turbulence': 8,
    CAT: 8,
    'wind shear': 8,
    gust: 6,
    downdraft: 7,
    updraft: 6,
    'mountain wave': 7,
    'jet stream': 6,
    convection: 6,
    'turbulent air': 8,
    'rough air': 7,
    'structural damage': 8,
    injury: 7,
    'cabin damage': 6,
    'passenger injury': 6,
    'crew injury': 6,
  },
};

const WSTRW: CICTTCategory = {
  code: 'WSTRW',
  name: 'Wind Shear / Wind Gust',
  description:
    'Encounter with wind shear during takeoff, approach, or landing resulting in loss of control, altitude loss, or inability to maintain desired flight path.',
  group: 'Weather/Environment',
  keywords: {
    'wind shear': 10,
    'wind gust': 9,
    microburst: 9,
    'wind gradient': 8,
    'shear wind': 8,
    'low level shear': 9,
    'takeoff wind shear': 9,
    'landing wind shear': 9,
    'approach wind shear': 9,
    'altitude loss': 8,
    'thrust loss': 7,
    'descent rate': 8,
    'climb rate': 7,
    crosswind: 7,
    'tailwind increase': 8,
    'headwind loss': 8,
    LLWS: 9,
    'weather radar': 5,
    ASOS: 4,
    AWOS: 4,
  },
};

const ICE: CICTTCategory = {
  code: 'ICE',
  name: 'Icing / Frost',
  description:
    'Atmospheric ice accumulation on aircraft structure, including rime ice, glaze ice, or frost affecting aerodynamic performance or systems.',
  group: 'Weather/Environment',
  keywords: {
    icing: 10,
    'ice accumulation': 10,
    'rime ice': 9,
    'glaze ice': 9,
    'mixed ice': 9,
    frost: 8,
    deicing: 6,
    'anti-ice': 6,
    'ice protection': 6,
    'ice accretion': 9,
    'structural ice': 9,
    'engine icing': 8,
    windshield: 7,
    'pitot tube': 8,
    'static port': 8,
    airspeed: 8,
    altitude: 8,
    'performance degradation': 8,
    airfoil: 8,
    'lift reduction': 8,
  },
};

// ============================================================================
// WILDLIFE CATEGORIES (2)
// ============================================================================

const BIRD: CICTTCategory = {
  code: 'BIRD',
  name: 'Bird Strike',
  description:
    'Aircraft strikes bird(s) in flight or on ground, potentially causing damage to airframe, engines, or windshield.',
  group: 'Wildlife',
  keywords: {
    'bird strike': 10,
    'wildlife strike': 9,
    birdstrike: 9,
    'bird ingestion': 9,
    'engine strike': 8,
    windshield: 8,
    goose: 8,
    geese: 8,
    eagle: 7,
    'large bird': 8,
    'small bird': 5,
    flock: 7,
    feather: 6,
    FOD: 6,
    'foreign object': 5,
    migration: 5,
    'wildlife area': 5,
    altitude: 5,
    'approach phase': 6,
    'takeoff phase': 6,
  },
};

const WILD: CICTTCategory = {
  code: 'WILD',
  name: 'Wildlife (Non-Bird)',
  description:
    'Aircraft strikes or encounters non-bird wildlife such as ground animals, deer, or other fauna on runway or during ground operations.',
  group: 'Wildlife',
  keywords: {
    wildlife: 10,
    'animal strike': 9,
    deer: 8,
    moose: 8,
    coyote: 7,
    fox: 6,
    rabbit: 4,
    'ground animal': 7,
    'runway animal': 8,
    'taxiway animal': 7,
    obstacle: 6,
    evasion: 4,
    'go-around': 3,
    abort: 3,
    damage: 5,
    injury: 5,
    'unknown animal': 6,
    'pest control': 4,
    'wildlife management': 4,
    environmental: 3,
  },
};

// ============================================================================
// TRAFFIC/SEPARATION CATEGORIES (2)
// ============================================================================

const MAC: CICTTCategory = {
  code: 'MAC',
  name: 'Mid-Air Collision',
  description:
    'Collision between two or more aircraft in flight, resulting in structural damage, loss of control, or aircraft destruction.',
  group: 'Traffic/Separation',
  keywords: {
    'mid-air collision': 10,
    collision: 10,
    'aircraft collision': 10,
    MAC: 10,
    conflict: 8,
    separation: 7,
    'lateral separation': 6,
    'vertical separation': 6,
    'altitude separation': 6,
    'ATC clearance': 5,
    'traffic alert': 7,
    TCAS: 6,
    'resolution advisory': 6,
    'traffic advisory': 5,
    'see and avoid': 5,
    'visual separation': 5,
    'radar separation': 4,
    communication: 6,
    coordination: 5,
    'controller error': 6,
  },
};

const ATM: CICTTCategory = {
  code: 'ATM',
  name: 'Air Traffic Management',
  description:
    'Operational error, communication failure, or procedural deviation related to air traffic control or management resulting in safety event.',
  group: 'Traffic/Separation',
  keywords: {
    'air traffic management': 10,
    'ATC error': 9,
    'controller error': 9,
    'clearance error': 8,
    'instruction error': 8,
    'communication failure': 8,
    'radio failure': 8,
    'readback error': 7,
    frequency: 6,
    'language barrier': 7,
    misunderstanding: 7,
    'lost separation': 8,
    'separation violation': 8,
    conflict: 7,
    coordination: 6,
    handoff: 5,
    radar: 4,
    'positive control': 5,
    instruction: 6,
    compliance: 5,
  },
};

// ============================================================================
// GROUND OPERATIONS CATEGORIES (3)
// ============================================================================

const RAMP: CICTTCategory = {
  code: 'RAMP',
  name: 'Ramp Event',
  description:
    'Occurrence during ground servicing, maintenance, or passenger/cargo handling operations at ramp or terminal area.',
  group: 'Ground Operations',
  keywords: {
    'ramp event': 10,
    'ramp accident': 9,
    'ground handling': 8,
    servicing: 7,
    maintenance: 7,
    fueling: 7,
    catering: 6,
    'passenger boarding': 6,
    'cargo loading': 6,
    equipment: 7,
    vehicle: 6,
    tug: 6,
    'tow bar': 5,
    pushback: 5,
    collision: 7,
    damage: 6,
    personnel: 5,
    'safety violation': 7,
    procedure: 5,
    injury: 6,
  },
};

const GTOW: CICTTCategory = {
  code: 'GTOW',
  name: 'Ground Handling / Towing',
  description:
    'Accident or incident involving aircraft being towed, tug operations, or ground maneuvering with tow equipment.',
  group: 'Ground Operations',
  keywords: {
    'ground handling': 10,
    towing: 9,
    tug: 8,
    'tow bar': 8,
    'towbar failure': 8,
    'tug failure': 7,
    'directional control': 7,
    'brake failure': 7,
    pushback: 6,
    'pushback tug': 7,
    'nose gear': 7,
    steering: 6,
    power: 6,
    collision: 7,
    damage: 6,
    'structural damage': 7,
    'nose gear damage': 8,
    'wing damage': 7,
    'fuselage damage': 7,
    'ground loop': 8,
  },
};

const ADRM: CICTTCategory = {
  code: 'ADRM',
  name: 'Aerodrome / Ground Facility',
  description:
    'Accident or incident related to aerodrome condition, infrastructure failure, or ground facilities affecting flight safety.',
  group: 'Ground Operations',
  keywords: {
    aerodrome: 10,
    'airport facility': 9,
    'runway condition': 8,
    'surface condition': 8,
    'pavement failure': 8,
    pothole: 7,
    debris: 8,
    'foreign object': 7,
    'runway closure': 6,
    taxiway: 6,
    apron: 5,
    lighting: 7,
    'navigation aid': 6,
    ILS: 6,
    LOC: 5,
    glideslope: 5,
    'equipment failure': 7,
    'facility failure': 8,
    infrastructure: 7,
    maintenance: 6,
  },
};

// ============================================================================
// CABIN/MEDICAL CATEGORIES (3)
// ============================================================================

const CABIN: CICTTCategory = {
  code: 'CABIN',
  name: 'Cabin / Cargo Safety',
  description:
    'Accident or incident involving cabin pressurization, cargo shifting, cabin furnishings, or cargo door malfunction during flight.',
  group: 'Cabin/Medical',
  keywords: {
    'cabin safety': 10,
    pressurization: 9,
    'cabin pressure': 9,
    depressurization: 9,
    'explosive decompression': 10,
    cargo: 8,
    'cargo shifting': 8,
    'cargo door': 8,
    'cargo door failure': 9,
    'cargo door open': 9,
    'secure cargo': 6,
    restraint: 7,
    'seat belt': 6,
    turbulence: 7,
    oxygen: 7,
    'emergency oxygen': 6,
    'seat failure': 7,
    'interior failure': 6,
    furnishings: 5,
    'ceiling panel': 5,
  },
};

const MED: CICTTCategory = {
  code: 'MED',
  name: 'Medical / Physiological',
  description:
    'Medical emergency, incapacitation of crew member, or physiological emergency affecting flight safety.',
  group: 'Cabin/Medical',
  keywords: {
    'medical emergency': 10,
    incapacitation: 9,
    'pilot incapacitation': 10,
    'crew incapacitation': 9,
    illness: 8,
    injury: 8,
    'heart attack': 9,
    stroke: 9,
    hypoxia: 9,
    hypoglycemia: 8,
    disorientation: 8,
    fatigue: 7,
    dehydration: 6,
    'medical condition': 8,
    medication: 5,
    alcohol: 8,
    'drug use': 9,
    'oxygen deprivation': 9,
    'altitude effects': 7,
    'decompression sickness': 8,
  },
};

const EVAC: CICTTCategory = {
  code: 'EVAC',
  name: 'Evacuation',
  description:
    'Emergency evacuation of aircraft including evacuation slides, exits, procedures, or injuries sustained during evacuation process.',
  group: 'Cabin/Medical',
  keywords: {
    evacuation: 10,
    'emergency evacuation': 10,
    'evacuation slide': 9,
    exit: 8,
    'emergency exit': 8,
    'over-wing exit': 7,
    door: 8,
    hatch: 7,
    'evacuation procedure': 7,
    'evacuation time': 6,
    'passenger evacuation': 8,
    'crew evacuation': 7,
    'injury during evacuation': 8,
    'evacuation injury': 8,
    'slide failure': 8,
    'slide inflation': 7,
    obstruction: 6,
    panic: 6,
    'orderly evacuation': 4,
    'ground personnel': 5,
  },
};

// ============================================================================
// OTHER CATEGORIES (7)
// ============================================================================

const NAV: CICTTCategory = {
  code: 'NAV',
  name: 'Navigation Error',
  description:
    'Error in aircraft navigation resulting in deviation from intended flight path, incorrect airport approach, or navigation system failure.',
  group: 'Other',
  keywords: {
    'navigation error': 10,
    'navigation mistake': 9,
    'wrong airport': 9,
    'wrong runway': 9,
    'navigation system failure': 9,
    'GPS failure': 8,
    'INS failure': 8,
    'VOR failure': 7,
    'NDB failure': 7,
    'ILS failure': 7,
    'chart error': 7,
    'chart misread': 7,
    misidentification: 8,
    'similar airport': 7,
    'similar runway': 7,
    'wrong heading': 7,
    'wrong altitude': 7,
    'position error': 8,
    drift: 6,
    'wind correction': 5,
  },
};

const LALT: CICTTCategory = {
  code: 'LALT',
  name: 'Low Altitude',
  description:
    'Inadvertent descent below minimum safe altitude, approach altitude, or decision height during normal operations.',
  group: 'Other',
  keywords: {
    'low altitude': 10,
    'below minimum altitude': 10,
    'descent below': 9,
    'altitude loss': 9,
    'minimum safe altitude': 8,
    'decision height': 8,
    'minimum descent altitude': 8,
    'minimum en route altitude': 7,
    'transition level': 6,
    'obstacle clearance': 8,
    'terrain clearance': 8,
    'altitude awareness': 6,
    'altitude alerter': 5,
    'terrain warning': 7,
    TAWS: 6,
    GPWS: 6,
    altimeter: 6,
    'barometric setting': 5,
    QNH: 5,
    altimetry: 5,
  },
};

const EXTL: CICTTCategory = {
  code: 'EXTL',
  name: 'External Load / Towing',
  description:
    'Loss of external load or towed object during flight, or failure of external load attachment systems.',
  group: 'Other',
  keywords: {
    'external load': 10,
    'towed load': 10,
    'cargo loss': 10,
    'load loss': 10,
    'load drop': 10,
    'attachment failure': 9,
    'sling failure': 8,
    'cargo hook': 8,
    'cable failure': 8,
    'rope failure': 7,
    'helicopter cargo': 8,
    'external tank': 6,
    'fuel tank drop': 7,
    ordnance: 8,
    weapons: 8,
    'military load': 7,
    'civil load': 6,
    'weight distribution': 5,
    'center of gravity': 5,
    stability: 6,
  },
};

const SEC: CICTTCategory = {
  code: 'SEC',
  name: 'Security Event',
  description:
    'Unlawful interference with aircraft, sabotage, hijacking, or security-related incident affecting flight safety.',
  group: 'Other',
  keywords: {
    'security event': 10,
    sabotage: 10,
    hijacking: 10,
    'unlawful interference': 10,
    'unruly passenger': 8,
    'security threat': 9,
    'bomb threat': 10,
    'explosive device': 10,
    'dangerous goods': 8,
    weapons: 9,
    'crew member attack': 9,
    assault: 8,
    'weapon on board': 9,
    'security breach': 8,
    'airport security': 6,
    'cargo security': 7,
    'access control': 6,
    'law enforcement': 5,
    'emergency landing': 7,
    diversion: 6,
  },
};

const LOLI: CICTTCategory = {
  code: 'LOLI',
  name: 'Loss of Lifting Force',
  description:
    'Loss of lift generation resulting from aerodynamic upset, aerosol contamination, or other atmospheric phenomena.',
  group: 'Other',
  keywords: {
    'loss of lifting force': 10,
    'loss of lift': 10,
    'lift loss': 10,
    stall: 9,
    'aerodynamic stall': 9,
    windshear: 8,
    'atmospheric hazard': 8,
    'volcanic ash': 9,
    'dust storm': 8,
    'sand storm': 8,
    'volcanic contamination': 9,
    aerosol: 8,
    contamination: 8,
    'engine failure': 7,
    'thrust loss': 7,
    'altitude loss': 9,
    descent: 8,
    'rapid descent': 9,
    'energy loss': 8,
    'performance loss': 8,
  },
};

const UNK: CICTTCategory = {
  code: 'UNK',
  name: 'Unknown or Undetermined',
  description:
    'Occurrence for which the causal category cannot be determined due to insufficient evidence or incomplete investigation.',
  group: 'Other',
  keywords: {
    'unknown cause': 10,
    undetermined: 10,
    'insufficient evidence': 8,
    unconfirmed: 7,
    unclear: 7,
    unexplained: 8,
    'investigation incomplete': 7,
    'probable cause': 5,
    'possible cause': 6,
    'contributing factor': 5,
    'not determined': 8,
    'multiple factors': 6,
    complexity: 5,
    'limited data': 6,
    speculation: 4,
    hypothesis: 4,
    'evidence gap': 7,
    'wreckage limited': 6,
    'witness limited': 5,
    'data recorder failure': 7,
  },
};

const OTHR: CICTTCategory = {
  code: 'OTHR',
  name: 'Other',
  description:
    'Accident or incident not classified within other CICTT categories; miscellaneous occurrences.',
  group: 'Other',
  keywords: {
    other: 10,
    miscellaneous: 8,
    unclassified: 8,
    unusual: 7,
    'aircraft damage': 6,
    'structural failure': 7,
    'maintenance issue': 6,
    'design issue': 6,
    'manufacturing defect': 7,
    'material failure': 7,
    corrosion: 6,
    'fatigue crack': 7,
    defect: 7,
    'improper maintenance': 7,
    'maintenance error': 7,
    'work scope': 5,
    documentation: 5,
    certification: 5,
    airworthiness: 6,
    inspection: 5,
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Complete CICTT Taxonomy - All 34 CAST/ICAO Accident Prevention Categories
 * Organized by occurrence group for incident classification
 */
export const CICTT_TAXONOMY: CICTTCategory[] = [
  LOC_I,
  LOC_G,
  AMAN,
  CFIT,
  CTOL,
  GCOL,
  RE,
  RI,
  USOS,
  ARC,
  SCF_PP,
  SCF_NP,
  FUEL,
  F_NI,
  F_POST,
  TURB,
  WSTRW,
  ICE,
  BIRD,
  WILD,
  MAC,
  ATM,
  RAMP,
  GTOW,
  ADRM,
  CABIN,
  MED,
  EVAC,
  NAV,
  LALT,
  EXTL,
  SEC,
  LOLI,
  UNK,
  OTHR,
];

/**
 * Ordered list of CICTT category groups for UI organization
 */
export const CICTT_GROUPS: string[] = [
  'Loss of Control',
  'Terrain/Obstacles',
  'Runway Events',
  'System Failures',
  'Fire/Smoke',
  'Weather/Environment',
  'Wildlife',
  'Traffic/Separation',
  'Ground Operations',
  'Cabin/Medical',
  'Other',
];

/**
 * Helper function to get a category by code
 */
export const getCICTTCategoryByCode = (code: string): CICTTCategory | undefined => {
  return CICTT_TAXONOMY.find((cat) => cat.code === code);
};

/**
 * Helper function to get all categories in a group
 */
export const getCICTTCategoriesByGroup = (group: string): CICTTCategory[] => {
  return CICTT_TAXONOMY.filter((cat) => cat.group === group);
};

/**
 * Helper function to search for categories by keyword
 * Returns matching categories with keyword weights
 */
export const searchCICTTByKeyword = (
  keyword: string,
  threshold: number = 0
): Array<{ category: CICTTCategory; weight: number }> => {
  const lowerKeyword = keyword.toLowerCase();
  const results: Array<{ category: CICTTCategory; weight: number }> = [];

  CICTT_TAXONOMY.forEach((category) => {
    Object.entries(category.keywords).forEach(([key, weight]) => {
      if (key.toLowerCase().includes(lowerKeyword) && weight > threshold) {
        const existing = results.find((r) => r.category.code === category.code);
        if (existing) {
          existing.weight = Math.max(existing.weight, weight);
        } else {
          results.push({ category, weight });
        }
      }
    });
  });

  return results.sort((a, b) => b.weight - a.weight);
};

/**
 * Helper function to calculate risk score based on keywords found
 * Returns overall risk score (0-100) based on keyword weights and frequency
 */
export const calculateRiskScoreFromKeywords = (
  text: string,
  categoryCode?: string
): number => {
  const lowerText = text.toLowerCase();
  const categories = categoryCode
    ? [getCICTTCategoryByCode(categoryCode)].filter((c) => c !== undefined)
    : CICTT_TAXONOMY;

  let totalScore = 0;
  let totalMatches = 0;

  categories.forEach((category) => {
    if (!category) return;
    Object.entries(category.keywords).forEach(([keyword, weight]) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        totalScore += weight * matches.length;
        totalMatches += matches.length;
      }
    });
  });

  if (totalMatches === 0) return 0;
  const avgScore = totalScore / totalMatches;
  return Math.min(100, Math.round(avgScore * 10));
};
