document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Leopard Fruit', img: '1.jpg', price: 25000 },
            { id: 2, name: 'Dough Fruit', img: '2.jpg', price: 18000 },
            { id: 3, name: 'Buddha Fruit', img: '3.jpg', price: 10000 },
            { id: 4, name: 'Portal Fruit', img: '4.jpg', price: 9000 },
            { id: 5, name: 'Mammoth Fruit', img: '5.jpg', price: 16000 },
            { id: 5, name: 'Rumble Fruit', img: '6.jpg', price: 8000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //cek apakah ada barang yg sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada atau cart masih kosong
            if(!cartItem) {
            this.items.push({...newItem, quantity: 1, total: newItem.price});
            this.quantity++;
            this.total += newItem.price;
            } else {
                //jika barang sudah ada di cart apakah barang beda atau sama
                this.items = this.items.map ((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantity dan subtotalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            //ambil item yang mau diremove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                //telusuri satu satu
                this.items = this.items.map((item) => {
                    //jika bukan barang yang di click
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                //jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

//konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};