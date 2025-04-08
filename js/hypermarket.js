document.addEventListener("DOMContentLoaded", function() {
                const hypermarketFilter = document.getElementById("hypermarketFilter");
                const priceRange = document.getElementById("priceRange");
                const categoryFilter = document.getElementById("category");
                const availabilityFilter = document.getElementById("availability");
                const searchInput = document.getElementById("search");
                const hypermarketName = document.getElementById("hypermarketName");
                const hypermarketDescription = document.getElementById("hypermarketDescription");
                const hypermarketImg = document.getElementById("hypermarketImg");
                const hypermarketProducts = document.getElementById("hypermarketProducts");
                const defaultHypermarketImage = "img/default-hypermarket.jpg"; // صورة افتراضية
            
                const productsData = [
                    // هايبر ماركت الأول
                    {
                        name: "أرز",
                        description: "أرز أبيض من النوع الأول.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/rice.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عصير برتقال",
                        description: "عصير برتقال طبيعي 100%.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "drinks",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/orange-juice.jpg",
                        discount: "5%"
                    },
                    {
                        name: "زيت زيتون",
                        description: "زيت زيتون بكر عذراء.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/olive-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "مربى فراولة",
                        description: "مربى فراولة طبيعية بدون سكر مضاف.",
                        price: 35,
                        discountedPrice: 31.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/strawberry-jam.jpg",
                        discount: "10%"
                    },
                    {
                        name: "حليب",
                        description: "حليب كامل الدسم.",
                        price: 20,
                        discountedPrice: 18,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/milk.jpg",
                        discount: "10%"
                    },
                    {
                        name: "خبز",
                        description: "خبز أبيض طازج.",
                        price: 40,
                        discountedPrice: 36,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/bread.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مكرونة",
                        description: "مكرونة إسباجيتي.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/spaghetti.jpg",
                        discount: "10%"
                    },
                    {
                        name: "صلصة طماطم",
                        description: "صلصة طماطم طازجة.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/tomato-sauce.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عسل",
                        description: "عسل نحل طبيعي.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/honey.jpg",
                        discount: "10%"
                    },
                    {
                        name: "شوكولاتة",
                        description: "شوكولاتة حلوى بالحليب.",
                        price: 50,
                        discountedPrice: 45,
                        category: "snacks",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/chocolate.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مياه معدنية",
                        description: "مياه معدنية طبيعية.",
                        price: 30,
                        discountedPrice: 28,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "1",
                        image: "img/mineral-water.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بسكويت",
                        description: "بسكويت بالشوكولاتة.",
                        price: 40,
                        discountedPrice: 38,
                        category: "snacks",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/cookies.jpg",
                        discount: "5%"
                    },
                    {
                        name: "مربى توت",
                        description: "مربى توت طبيعية.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/berry-jam.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زيت عباد الشمس",
                        description: "زيت عباد الشمس صحي.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/sunflower-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "عصير تفاح",
                        description: "عصير تفاح طبيعي.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/apple-juice.jpg",
                        discount: "0%"
                    },
                    {
                        name: "خل",
                        description: "خل أبيض.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/vinegar.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زنجبيل",
                        description: "زنجبيل مجفف.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/ginger.jpg",
                        discount: "0%"
                    },
                    {
                        name: "كرفس",
                        description: "كرفس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/celery.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بقدونس",
                        description: "بقدونس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/parsley.jpg",
                        discount: "0%"
                    },
                    {
                        name: "ثوم",
                        description: "ثوم طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/garlic.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بصل",
                        description: "بصل أحمر.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/onion.jpg",
                        discount: "0%"
                    },
                    {
                        name: "فلفل",
                        description: "فلفل أخضر.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/green-pepper.jpg",
                        discount: "0%"
                    },
                    {
                        name: "جزر",
                        description: "جزر طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "1",
                        image: "img/carrot.jpg",
                        discount: "0%"
                    },
                    // هايبر ماركت الثاني
                    {
                        name: "أرز",
                        description: "أرز أبيض من النوع الأول.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/rice.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عصير برتقال",
                        description: "عصير برتقال طبيعي 100%.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "drinks",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/orange-juice.jpg",
                        discount: "5%"
                    },
                    {
                        name: "زيت زيتون",
                        description: "زيت زيتون بكر عذراء.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/olive-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "مربى فراولة",
                        description: "مربى فراولة طبيعية بدون سكر مضاف.",
                        price: 35,
                        discountedPrice: 31.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/strawberry-jam.jpg",
                        discount: "10%"
                    },
                    {
                        name: "حليب",
                        description: "حليب كامل الدسم.",
                        price: 20,
                        discountedPrice: 18,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/milk.jpg",
                        discount: "10%"
                    },
                    {
                        name: "خبز",
                        description: "خبز أبيض طازج.",
                        price: 40,
                        discountedPrice: 36,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/bread.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مكرونة",
                        description: "مكرونة إسباجيتي.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/spaghetti.jpg",
                        discount: "10%"
                    },
                    {
                        name: "صلصة طماطم",
                        description: "صلصة طماطم طازجة.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/tomato-sauce.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عسل",
                        description: "عسل نحل طبيعي.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/honey.jpg",
                        discount: "10%"
                    },
                    {
                        name: "شوكولاتة",
                        description: "شوكولاتة حلوى بالحليب.",
                        price: 50,
                        discountedPrice: 45,
                        category: "snacks",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/chocolate.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مياه معدنية",
                        description: "مياه معدنية طبيعية.",
                        price: 30,
                        discountedPrice: 28,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "2",
                        image: "img/mineral-water.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بسكويت",
                        description: "بسكويت بالشوكولاتة.",
                        price: 40,
                        discountedPrice: 38,
                        category: "snacks",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/cookies.jpg",
                        discount: "5%"
                    },
                    {
                        name: "مربى توت",
                        description: "مربى توت طبيعية.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/berry-jam.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زيت عباد الشمس",
                        description: "زيت عباد الشمس صحي.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/sunflower-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "عصير تفاح",
                        description: "عصير تفاح طبيعي.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/apple-juice.jpg",
                        discount: "0%"
                    },
                    {
                        name: "خل",
                        description: "خل أبيض.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/vinegar.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زنجبيل",
                        description: "زنجبيل مجفف.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/ginger.jpg",
                        discount: "0%"
                    },
                    {
                        name: "كرفس",
                        description: "كرفس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/celery.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بقدونس",
                        description: "بقدونس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/parsley.jpg",
                        discount: "0%"
                    },
                    {
                        name: "ثوم",
                        description: "ثوم طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/garlic.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بصل",
                        description: "بصل أحمر.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/onion.jpg",
                        discount: "0%"
                    },
                    {
                        name: "فلفل",
                        description: "فلفل أخضر.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/green-pepper.jpg",
                        discount: "0%"
                    },
                    {
                        name: "جزر",
                        description: "جزر طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "2",
                        image: "img/carrot.jpg",
                        discount: "0%"
                    },
                    // هايبر ماركت الثالث
                    {
                        name: "أرز",
                        description: "أرز أبيض من النوع الأول.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/rice.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عصير برتقال",
                        description: "عصير برتقال طبيعي 100%.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "drinks",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/orange-juice.jpg",
                        discount: "5%"
                    },
                    {
                        name: "زيت زيتون",
                        description: "زيت زيتون بكر عذراء.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/olive-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "مربى فراولة",
                        description: "مربى فراولة طبيعية بدون سكر مضاف.",
                        price: 35,
                        discountedPrice: 31.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/strawberry-jam.jpg",
                        discount: "10%"
                    },
                    {
                        name: "حليب",
                        description: "حليب كامل الدسم.",
                        price: 20,
                        discountedPrice: 18,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/milk.jpg",
                        discount: "10%"
                    },
                    {
                        name: "خبز",
                        description: "خبز أبيض طازج.",
                        price: 40,
                        discountedPrice: 36,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/bread.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مكرونة",
                        description: "مكرونة إسباجيتي.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/spaghetti.jpg",
                        discount: "10%"
                    },
                    {
                        name: "صلصة طماطم",
                        description: "صلصة طماطم طازجة.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/tomato-sauce.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عسل",
                        description: "عسل نحل طبيعي.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/honey.jpg",
                        discount: "10%"
                    },
                    {
                        name: "شوكولاتة",
                        description: "شوكولاتة حلوى بالحليب.",
                        price: 50,
                        discountedPrice: 45,
                        category: "snacks",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/chocolate.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مياه معدنية",
                        description: "مياه معدنية طبيعية.",
                        price: 30,
                        discountedPrice: 28,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "3",
                        image: "img/mineral-water.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بسكويت",
                        description: "بسكويت بالشوكولاتة.",
                        price: 40,
                        discountedPrice: 38,
                        category: "snacks",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/cookies.jpg",
                        discount: "5%"
                    },
                    {
                        name: "مربى توت",
                        description: "مربى توت طبيعية.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/berry-jam.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زيت عباد الشمس",
                        description: "زيت عباد الشمس صحي.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/sunflower-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "عصير تفاح",
                        description: "عصير تفاح طبيعي.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/apple-juice.jpg",
                        discount: "0%"
                    },
                    {
                        name: "خل",
                        description: "خل أبيض.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/vinegar.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زنجبيل",
                        description: "زنجبيل مجفف.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/ginger.jpg",
                        discount: "0%"
                    },
                    {
                        name: "كرفس",
                        description: "كرفس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/celery.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بقدونس",
                        description: "بقدونس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/parsley.jpg",
                        discount: "0%"
                    },
                    {
                        name: "ثوم",
                        description: "ثوم طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/garlic.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بصل",
                        description: "بصل أحمر.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/onion.jpg",
                        discount: "0%"
                    },
                    {
                        name: "فلفل",
                        description: "فلفل أخضر.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/green-pepper.jpg",
                        discount: "0%"
                    },
                    {
                        name: "جزر",
                        description: "جزر طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "3",
                        image: "img/carrot.jpg",
                        discount: "0%"
                    },
                    // هايبر ماركت الرابع
                    {
                        name: "أرز",
                        description: "أرز أبيض من النوع الأول.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/rice.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عصير برتقال",
                        description: "عصير برتقال طبيعي 100%.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "drinks",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/orange-juice.jpg",
                        discount: "5%"
                    },
                    {
                        name: "زيت زيتون",
                        description: "زيت زيتون بكر عذراء.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/olive-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "مربى فراولة",
                        description: "مربى فراولة طبيعية بدون سكر مضاف.",
                        price: 35,
                        discountedPrice: 31.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/strawberry-jam.jpg",
                        discount: "10%"
                    },
                    {
                        name: "حليب",
                        description: "حليب كامل الدسم.",
                        price: 20,
                        discountedPrice: 18,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/milk.jpg",
                        discount: "10%"
                    },
                    {
                        name: "خبز",
                        description: "خبز أبيض طازج.",
                        price: 40,
                        discountedPrice: 36,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/bread.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مكرونة",
                        description: "مكرونة إسباجيتي.",
                        price: 25,
                        discountedPrice: 22.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/spaghetti.jpg",
                        discount: "10%"
                    },
                    {
                        name: "صلصة طماطم",
                        description: "صلصة طماطم طازجة.",
                        price: 15,
                        discountedPrice: 13.5,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/tomato-sauce.jpg",
                        discount: "10%"
                    },
                    {
                        name: "عسل",
                        description: "عسل نحل طبيعي.",
                        price: 20,
                        discountedPrice: 18,
                        category: "food",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/honey.jpg",
                        discount: "10%"
                    },
                    {
                        name: "شوكولاتة",
                        description: "شوكولاتة حلوى بالحليب.",
                        price: 50,
                        discountedPrice: 45,
                        category: "snacks",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/chocolate.jpg",
                        discount: "10%"
                    },
                    {
                        name: "مياه معدنية",
                        description: "مياه معدنية طبيعية.",
                        price: 30,
                        discountedPrice: 28,
                        category: "drinks",
                        availability: "in-stock",
                        hypermarketId: "4",
                        image: "img/mineral-water.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بسكويت",
                        description: "بسكويت بالشوكولاتة.",
                        price: 40,
                        discountedPrice: 38,
                        category: "snacks",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/cookies.jpg",
                        discount: "5%"
                    },
                    {
                        name: "مربى توت",
                        description: "مربى توت طبيعية.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/berry-jam.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زيت عباد الشمس",
                        description: "زيت عباد الشمس صحي.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/sunflower-oil.jpg",
                        discount: "0%"
                    },
                    {
                        name: "عصير تفاح",
                        description: "عصير تفاح طبيعي.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/apple-juice.jpg",
                        discount: "0%"
                    },
                    {
                        name: "خل",
                        description: "خل أبيض.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/vinegar.jpg",
                        discount: "0%"
                    },
                    {
                        name: "زنجبيل",
                        description: "زنجبيل مجفف.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/ginger.jpg",
                        discount: "0%"
                    },
                    {
                        name: "كرفس",
                        description: "كرفس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/celery.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بقدونس",
                        description: "بقدونس طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/parsley.jpg",
                        discount: "0%"
                    },
                    {
                        name: "ثوم",
                        description: "ثوم طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/garlic.jpg",
                        discount: "0%"
                    },
                    {
                        name: "بصل",
                        description: "بصل أحمر.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/onion.jpg",
                        discount: "0%"
                    },
                    {
                        name: "فلفل",
                        description: "فلفل أخضر.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/green-pepper.jpg",
                        discount: "0%"
                    },
                    {
                        name: "جزر",
                        description: "جزر طازج.",
                        availability: "out-of-stock",
                        hypermarketId: "4",
                        image: "img/carrot.jpg",
                        discount: "0%"
                    }
                ];
            
                // بيانات الهايبر ماركت
                const hypermarketsData = [
                    {
                        id: "1",
                        name: "هايبر ماركت الأول",
                        description: "هايبر ماركت متكامل يحتوي على منتجات غذائية متنوعة.",
                        image: "img/hypermarket1.jpg"
                    },
                    {
                        id: "2",
                        name: "هايبر ماركت الراية",
                        description: "هايبر ماركت متخصص في المنتجات الغذائية الصحية.",
                        image: "img/hypermarket2.jpg"
                    },
                    {
                        id: "3",
                        name: "هايبر ماركت الفرجاني",
                        description: "هايبر ماركت متكامل يحتوي على منتجات غذائية متنوعة.",
                        image: "img/hypermarket3.jpg"
                    },
                    {
                        id: "4",
                        name: "هايبر ماركت المحلاوي",
                        description: "هايبر ماركت متكامل يحتوي على منتجات غذائية متنوعة.",
                        image: "img/hypermarket4.jpg"
                    }
                ];
            
                hypermarketFilter.addEventListener("change", function () {
                    filterProducts();
                    addEventListeners(); // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
                });
            
                function filterProducts() {
                    const selectedHypermarketId = hypermarketFilter.value;
                    const selectedCategory = categoryFilter.value;
                    const selectedAvailability = availabilityFilter.value;
                    const maxPrice = priceRange.value;
            
                    const filteredProducts = productsData.filter(product => {
                        const matchesHypermarket = selectedHypermarketId === "0" || product.hypermarketId === selectedHypermarketId;
                        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
                        const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;
                        const matchesPrice = product.discountedPrice <= maxPrice;
            
                        return matchesHypermarket && matchesCategory && matchesAvailability && matchesPrice;
                    });
            
                    renderProducts(filteredProducts);
                }
            
                function renderProducts(products) {
                    hypermarketProducts.innerHTML = "";  // مسح المنتجات السابقة
            
                    if (products.length === 0) {
                        hypermarketProducts.innerHTML = "<p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>";
                    } else {
                        products.forEach(product => {
                            const productCard = document.createElement("div");
                            productCard.classList.add("product-card");
            
                            productCard.innerHTML = `
                                <div class="product-image">
                                    <img src="${product.image}" alt="${product.name}">
                                    ${product.discount ? `<span class="discount">خصم ${product.discount}</span>` : ""}
                                </div>
                                <div class="product-info">
                                    <h3>${product.name}</h3>
                                    <p class="product-description">${product.description}</p>
                                    <div class="price">
                                        <span class="original-price">${product.price} جنيه</span>
                                        <span class="discounted-price">${product.discountedPrice} جنيه</span>
                                    </div>
                                    <div class="product-actions">
                                        <button class="add-to-favorite"><i class="fa-regular fa-heart"></i></button>
                                        <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                                    </div>
                                </div>
                            `;
            
                            hypermarketProducts.appendChild(productCard);
                        });
                    }
            
                    addEventListeners(); // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
                }
            
                function addEventListeners() {
                    const cartButtons = document.querySelectorAll(".add-to-cart");
                    const favoriteButtons = document.querySelectorAll(".add-to-favorite");
                    const buyNowButtons = document.querySelectorAll(".buy-now");
                    const productImages = document.querySelectorAll(".product-image img");
            
                    cartButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const productCard = this.closest(".product-card");
                            const product = {
                                image: productCard.querySelector(".product-image img").src,
                                name: productCard.querySelector("h3").textContent,
                                description: productCard.querySelector(".product-description").textContent,
                                originalPrice: productCard.querySelector(".original-price").textContent,
                                discountedPrice: productCard.querySelector(".discounted-price").textContent
                            };
            
                            let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                            const existingProductIndex = myCart.findIndex(item => item.name === product.name);
            
                            if (existingProductIndex !== -1) {
                                myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
                            } else {
                                product.quantity = 1;
                                myCart.push(product);
                            }
            
                            localStorage.setItem("myCart", JSON.stringify(myCart));
                            updateCartDisplay();
                            alert("تمت إضافة المنتج إلى السلة!");
                        });
                    });
            
                    favoriteButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const productCard = this.closest(".product-card");
                            const product = {
                                image: productCard.querySelector(".product-image img").src,
                                name: productCard.querySelector("h3").textContent,
                                description: productCard.querySelector(".product-description").textContent,
                                originalPrice: productCard.querySelector(".original-price").textContent,
                                discountedPrice: productCard.querySelector(".discounted-price").textContent
                            };
            
                            let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                            const existingProductIndex = myFavorites.findIndex(item => item.name === product.name);
            
                            if (existingProductIndex !== -1) {
                                alert("المنتج موجود بالفعل في المفضلة!");
                            } else {
                                myFavorites.push(product);
                                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                                alert("تمت إضافة المنتج إلى المفضلة!");
                            }
                        });
                    });
            
                    buyNowButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const productCard = this.closest(".product-card");
                            const product = {
                                image: productCard.querySelector(".product-image img").src,
                                name: productCard.querySelector("h3").textContent,
                                description: productCard.querySelector(".product-description").textContent,
                                originalPrice: productCard.querySelector(".original-price").textContent,
                                discountedPrice: productCard.querySelector(".discounted-price").textContent
                            };
            
                            // Store the product in local storage or pass it through URL parameters
                            localStorage.setItem("quickBuyProduct", JSON.stringify(product));
            
                            // Redirect to the quick buy page
                            window.location.href = "quick-buy.html";
                        });
                    });
            
                    productImages.forEach((img) => {
                        img.addEventListener("click", function () {
                            const productCard = this.closest(".product-card");
                            const product = {
                                image: productCard.querySelector(".product-image img").src,
                                name: productCard.querySelector("h3").textContent,
                                description: productCard.querySelector(".product-description").textContent,
                                originalPrice: productCard.querySelector(".original-price").textContent,
                                discountedPrice: productCard.querySelector(".discounted-price").textContent
                            };
            
                            // Store the product in local storage
                            localStorage.setItem("productDetails", JSON.stringify(product));
            
                            // Redirect to the product details page
                            window.location.href = "product_details.html";
                        });
                    });
                }
            
                function updateCartDisplay() {
                    const cartCount = document.getElementById("cartCount");
                    if (cartCount) {
                        const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                        cartCount.textContent = myCart.length;
                    }
                }
            
                priceRange.addEventListener("input", function () {
                    filterProducts();
                    document.getElementById('priceDisplay').textContent = 'السعر: ' + this.value;
                });
            
                categoryFilter.addEventListener("change", filterProducts);
                availabilityFilter.addEventListener("change", filterProducts);
            
                searchInput.addEventListener("input", function () {
                    const searchText = searchInput.value.trim().toLowerCase();
                    const productCards = document.querySelectorAll(".product-card");
            
                    productCards.forEach((card) => {
                        const productName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
                        const productDescription = card.querySelector("p")?.textContent.trim().toLowerCase() || "";
            
                        if (productName.includes(searchText) || productDescription.includes(searchText)) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    });
                });
            
                filterProducts();
            });
            
            document.getElementById('priceRange').addEventListener('input', function() {
                var priceValue = this.value;
                document.getElementById('priceDisplay').textContent = 'السعر: ' + priceValue;
            });
            