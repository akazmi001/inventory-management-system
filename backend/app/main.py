from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Inventor Management API"}

# PRODUCT APIs
@app.post("/products")
def create_product(p: schemas.ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Product).filter_by(sku=p.sku).first()
    if existing:
        raise HTTPException(400, "SKU already exists")
    product = models.Product(**p.dict())
    db.add(product)
    db.commit()
    return product

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

# CUSTOMER APIs
@app.post("/customers")
def create_customer(c: schemas.CustomerCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Customer).filter_by(email=c.email).first()
    if existing:
        raise HTTPException(400, "Email exists")
    customer = models.Customer(**c.dict())
    db.add(customer)
    db.commit()
    return customer

@app.get("/customers")
def get_customers(db: Session = Depends(get_db)):
    return db.query(models.Customer).all()

# ORDER APIs
@app.post("/orders")
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = models.Order(customer_id=order.customer_id)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:
        product = db.query(models.Product).get(item.product_id)
        if product.stock < item.quantity:
            raise HTTPException(400, f"Insufficient stock for {product.name}")

        product.stock -= item.quantity

        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(db_item)

    db.commit()
    return {"message": "Order created"}