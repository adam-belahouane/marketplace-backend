CREATE TABLE IF NOT EXISTS
    products(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(100) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        imageURL VARCHAR(100),
        price VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
		updated_at TIMESTAMPTZ DEFAULT NOW()
    );


CREATE TABLE IF NOT EXISTS
  reviews(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment VARCHAR(200) NOT NULL,
    rate SMALLINT NOT NULL,
    product_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );