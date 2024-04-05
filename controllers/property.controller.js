import { db } from "../server.js";

export const addProperty = async (req, res) => {
  const {
    title,
    price,
    description,
    image,
    location,
    bedrooms,
    bathrooms,
    area,
    amenities,
    status,
  } = req.body;

  try {
    await db.query(
      "INSERT INTO properties (title,price,description,image,location,bedrooms,bathrooms,area,amenities,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        title,
        price,
        description,
        image,
        location,
        bedrooms,
        bathrooms,
        area,
        amenities,
        status,
      ]
    );
    return res.status(200).json({ message: "Property has been inserted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Failed to inserted property" });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await db.query("DELETE FROM properties WHERE id=($1)", [parseInt(id)]);
    return res.status(200).send({ message: "Property has been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Failed to delete property" });
  }
};
export const listProperty = async (req, res) => {
  const location = req.query.location;
  const bathrooms = req.query.bathrooms;
  const bedrooms = req.query.bedrooms;
  const status = req.query.status;
  const amenities = req.query.amenities;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const area = req.query.area;

  // Build the WHERE clause dynamically based on provided parameters
  let whereClause = "";
  const queryParams = [];
  let paramCount = 1;

  if (location !== undefined) {
    whereClause += `location = $${paramCount} AND `;
    queryParams.push(location);
    paramCount++;
  }
  if (bathrooms !== undefined) {
    whereClause += `bathrooms = $${paramCount} AND `;
    queryParams.push(bathrooms);
    paramCount++;
  }
  if (bedrooms !== undefined) {
    whereClause += `bedrooms = $${paramCount} AND `;
    queryParams.push(bedrooms);
    paramCount++;
  }
  if (minPrice !== undefined) {
    whereClause += `price>=$${paramCount} AND `;
    queryParams.push(minPrice);
    paramCount++;
  }
  if (maxPrice !== undefined) {
    whereClause += `price<=$${paramCount} AND `;
    queryParams.push(maxPrice);
    paramCount++;
  }
  //   i was about to do amenities setup

  if (whereClause !== "") {
    whereClause = "WHERE " + whereClause.slice(0, -5);
  }

  try {
    const query = `
        SELECT * 
        FROM properties 
        ${whereClause}
      `;

    const data = await db.query(query, queryParams);
    const properties = data.rows;
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRandomProperty = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM properties");
    const properties = data.rows;
    const randomPropertyIndex = Math.floor(Math.random() * properties.length);
    const randomProperty = properties[randomPropertyIndex];

    return res.status(200).send(randomProperty);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM properties");
    const properties = data.rows;
    return res.status(200).send(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};

export const getSingleProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await db.query("SELECT * FROM properties WHERE id=($1)", [id]);
    const propertie = data.rows;
    return res.status(200).send(propertie);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};
export const updateProperty = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    price,
    description,
    image,
    location,
    bedrooms,
    bathrooms,
    area,
    amenities,
    status,
  } = req.body;
  try {
    const data = await db.query(
      "UPDATE properties    SET title=($1),price=($2),description=($3),image=($4),location=($5),bedrooms=($6),bathrooms=($7),area=($8),amenities=($9),status=($10) WHERE id=($11) RETURNING *",
      [
        title,
        price,
        description,
        image,
        location,
        bedrooms,
        bathrooms,
        area,
        amenities,
        status,
        id,
      ]
    );
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};
export const getAllLocations = async (req, res) => {
  try {
    const data = await db.query("SELECT location FROM properties");
    const locations = data.rows;
    let uniqueLocations = [
      ...new Set(locations.map((obj) => obj.location.toLowerCase())),
    ];
    console.log(uniqueLocations);
    return res.status(200).send(uniqueLocations);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};
export const getLimitProperty = async (req, res) => {
  const { limit } = req.query;

  try {
    const data = await db.query("SELECT * FROM properties LIMIT ($1)", [
      parseInt(limit),
    ]);
    const properties = data.rows;
    console.log(properties);
    return res.status(200).send(properties);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "error" });
  }
};
