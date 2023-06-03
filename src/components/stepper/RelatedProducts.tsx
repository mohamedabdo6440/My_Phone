import Image from 'next/image'

// local modules
import styles from '@/styles/components/relatedProducts.module.scss'

// local static files
import ip11 from '@/images/web_iphone11.png'
import ip12 from '@/images/web_iphone12.png'
import ip8 from '@/images/web_iphone8.png'
import ipxs from '@/images/web_iphonexs.png'

const data = [
    {
        name: 'iPhone 11',
        image: ip11,
        price: 218.0,
    },
    {
        name: 'iPhone 12 Pro Max',
        image: ip12,
        price: 400.0,
    },
    {
        name: 'iPhone XS',
        image: ipxs,
        price: 400.0,
    },
    {
        name: 'iPhone 8',
        image: ip8,
        price: 400.0,
    },
]

const RelatedProducts = () => {
    return (
        <div className={styles.box}>
            <h2>Related Products</h2>
            <div className={styles.products_container}>
                {data.map((product, index) => (
                    <div key={index} className={styles.product}>
                        <Image src={product.image} alt='iPhone 11' />
                        <h3>{product.name}</h3>
                        <strong>{product.price}.00$</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts
