CREATE TABLE bowl_cards_name (
    id INTEGER UNIQUE,
    bowl_card_name VARCHAR(255)
);

ALTER TABLE bowl_cards_name
ADD CONSTRAINT unique_bowl_card_name UNIQUE (bowl_card_name);

CREATE TABLE shot_cards_name (
    id INTEGER UNIQUE,
    shot_card_name VARCHAR(255)
);

ALTER TABLE shot_cards_name
ADD CONSTRAINT unique_shot_card_name UNIQUE (shot_card_name);

CREATE TABLE shot_timing (
    id INTEGER UNIQUE,
    shot_timing_name VARCHAR(255)
);

ALTER TABLE shot_timing
ADD CONSTRAINT unique_shot_timing UNIQUE (shot_timing_name);

CREATE TABLE shot_for_bowl (
    id SERIAL PRIMARY KEY,
    bowl_card VARCHAR(255) REFERENCES bowl_cards_name(bowl_card_name),
    shot_card TEXT []
);

CREATE TABLE outcome_for_timing (
    timing VARCHAR(255),
    outcome TEXT []
);

CREATE TABLE prediction_chart (
    input VARCHAR(255) UNIQUE,
    output VARCHAR(255)
);

CREATE TABLE commentary_for_outcome (
    outcome VARCHAR(255),
    commentary TEXT []
);

INSERT INTO bowl_cards_name (id,bowl_card_name) VALUES 
(1,'Bouncer'),(2,'Inswinger'),(3,'Outswinger'),(4,'Leg cutter'),
(5,'Off cutter'),(6,'Slower ball'),(7,'Yorker'),(8,'Pace'),
(9,'Off break'),(10,'Doosra');

INSERT INTO shot_cards_name (id,shot_card_name) VALUES 
(1,'Straight'),(2,'Sweep'),(3,'Flick'),(4,'CoverDrive'),
(5,'LegLance'),(6,'Pull'),(7,'Long on'),(8,'Scoop'),
(9,'Square cut'),(10,'UpperCut');

INSERT INTO shot_timing (id,shot_timing_name) VALUES 
(1,'Early'),(2,'Good'),(3,'Perfect'),(4,'Late');

INSERT INTO shot_for_bowl (bowl_card,shot_card) VALUES 
('Bouncer', ARRAY ['Pull', 'SquareCut']),
('Inswinger', ARRAY ['CoverDrive', 'LegLance']),
('Outswinger', ARRAY ['Straight','Sweep']),
('Leg cutter', ARRAY ['Flick','SquareCut']),
('Off cutter', ARRAY ['CoverDrive','Sweep']),
('Slower ball', ARRAY ['Scoop','Straight']),
('Yorker', ARRAY ['Straight','LegLance']),
('Pace', ARRAY ['Pull','UpperCut']),
('Off break', ARRAY ['CoverDrive','SquareCut']),
('Doosra', ARRAY ['LegLance','Sweep']);

INSERT INTO outcome_for_timing (timing,outcome) VALUES 
('Early', ARRAY ['1 run', '2 runs']),
('Good', ARRAY ['4 runs', '6 runs']),
('Perfect', ARRAY ['4 runs', '6 runs']),
('Late', ARRAY ['1 wicket']);

INSERT INTO commentary_for_outcome (outcome,commentary) VALUES 
('0 run', ARRAY ['Edged and taken','Excellent line and length']),
('1 run', ARRAY ['Excellent line and length']),
('2 runs', ARRAY ['Convert ones into twos','Excellent effort on the boundary']),
('3 runs', ARRAY ['Excellent running between the wickets','Excellent effort on the boundary']),
('4 runs', ARRAY ['Just over the fielder']),
('6 runs', ARRAY ['It is a huge hit', 'That is massive and out of the ground']),
('1 wicket', ARRAY ['It is a wicket']);