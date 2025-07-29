'use client'
import styles from './ServiceContent.module.scss'
import {useLanguage} from "@/components/LanguageProvider/LanguageProvider";

export const ServiceContent = () => {
    const {lang} = useLanguage()
    return (
        <div className={styles.content}>
            <div>{lang === 'ru' ? 'СЕРВИС' : 'SERVICE'}</div>
            <div>
                {lang === 'ru' ? '• ПОЧТИ ВСЕ УКРАШЕНИЯ СОЗДАЮТСЯ В СТАНДАРТНЫХ И/ИЛИ УКАЗАННЫХ В ОПИСАНИИ РАЗМЕРАХ. МЫ МОЖЕМ ИЗГОТОВИТЬ УКРАШЕНИЯ ПО ВАШИМ ИНДИВИДУАЛЬНЫМ МЕРКАМ.': '• ALMOST ALL JEWELRY IS MADE IN STANDARD AND/OR SPECIFIED SIZES. WE CAN MANUFACTURE JEWELRY ACCORDING TO YOUR INDIVIDUAL MEASUREMENTS.'}
            </div>
            <div>
                {lang === 'ru' ? '• Для этого необходимо указать в комментарии к предзаказу желаемые параметры, например длину цепочки или размер кольца, которого нет в списке предложенных параметров. Срок изготовления 14-60 дней с момента оформления предзаказа.' : '• To do this, please specify the desired parameters in the comments to the pre-order, for example, the length of the chain or the size of the ring, which is not in the list of proposed parameters. The production time is 14-60 days from the date of placing the pre-order.'}
            </div>
            <div>
                {lang === 'ru' ? '• На все украшения, беспрекословно, магазин дает пожизненную гарантию.' : '• The store provides a lifetime warranty on all jewelry without exception.'}
                <br/>
                {lang === 'ru' ? '• Покупатель всегда может обновить внешний вид приобретенных товаров: отполировать,' : '• The buyer can always update the appearance of the purchased goods: polish,'}
                <br/>
                {lang === 'ru' ? '• зачернить, матировать и отремонтировать.' : '• blacken, matte, and repair.'}
                <br/>
                {lang === 'ru' ? '• Гарантия не распространяется на физические повреждения камней изделия.' : '• The warranty does not cover physical damage to the stones of the product.'}
                <br/>
            </div>
            <div>
                {lang === 'ru' ? '• Магазин не несёт ответственности за сломанный и/или поврежденный товар во время эксплуатации его клиентом, но всегда поможет восстановить или заменит украшение.' : '• The store is not responsible for broken and/or damaged goods during use by the customer, but will always help to restore or replace the jewelry.'}
            </div>
            <div>
                {lang === 'ru' ? '• Магазин не несет ответственности за разбитые камни, но произведет замену камня или изделия за обговоренную сторонами стоимость.' : '• The store is not responsible for broken stones, but will replace the stone or product at a cost agreed upon by both parties.'}
            </div>
            <div>
                {lang === 'ru' ? 'По всем вопросам и предложениям пишите на нашу почту' : 'For all questions and suggestions, please write to our email address'}
                <br/>
                {lang === 'ru' ? 'service@27jwlr.com и мы ответим вам в кратчайшие сроки.' : 'service@27jwlr.com and we will respond as soon as possible.'}
            </div>
        </div>
    )
}

export const ServiceTitle = () => {
    const {lang} = useLanguage()
    return(
        <div className={styles.service}>{lang === "ru" ? 'сервис' : "service"}</div>
    )
}