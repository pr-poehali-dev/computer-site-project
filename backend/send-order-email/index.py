import json
import os
from typing import Dict, Any
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class EmailData:
    to_email: str
    subject: str
    html_body: str

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send order confirmation and status update emails
    Args: event with httpMethod, body containing order data
          context with request_id
    Returns: HTTP response with email status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    email_type = body_data.get('type', 'order_confirmation')
    order_data = body_data.get('order', {})
    
    customer_email = order_data.get('customer', {}).get('email')
    if not customer_email:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Customer email is required'})
        }
    
    if email_type == 'order_confirmation':
        email_html = generate_order_confirmation_email(order_data)
        subject = f'Заказ #{order_data.get("orderNumber")} оформлен - CYBERPUNK PC'
    elif email_type == 'status_update':
        email_html = generate_status_update_email(order_data)
        subject = f'Обновление заказа #{order_data.get("orderNumber")}'
    else:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid email type'})
        }
    
    result = {
        'success': True,
        'message': f'Email would be sent to {customer_email}',
        'email_type': email_type,
        'order_number': order_data.get('orderNumber'),
        'subject': subject,
        'preview': email_html[:200] + '...'
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(result)
    }

def generate_order_confirmation_email(order: Dict[str, Any]) -> str:
    customer = order.get('customer', {})
    customer_email = customer.get('email', '')
    delivery = order.get('delivery', {})
    items = order.get('items', [])
    order_number = order.get('orderNumber', 'N/A')
    total = order.get('total', 0)
    applied_promo = order.get('appliedPromo')
    
    order_date = datetime.now()
    estimated_delivery = order_date + timedelta(days=5)
    
    items_html = ''
    for item in items:
        items_html += f'''
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">{item.get('name', '')}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">{item.get('quantity', 0)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">{item.get('price', 0)} ₽</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">{item.get('price', 0) * item.get('quantity', 0)} ₽</td>
        </tr>
        '''
    
    promo_html = ''
    if applied_promo:
        promo_html = f'''
        <tr>
            <td colspan="3" style="padding: 12px; text-align: right; color: #10b981;">🎟️ Промокод {applied_promo.get('code', '')}</td>
            <td style="padding: 12px; text-align: right; color: #10b981; font-weight: 600;">-{applied_promo.get('discount', 0)}%</td>
        </tr>
        '''
    
    html_body = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✓ Заказ оформлен!</h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 30px 40px;">
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151;">
                                    Здравствуйте, <strong>{customer.get('firstName', '')} {customer.get('lastName', '')}</strong>!
                                </p>
                                <p style="margin: 0 0 30px 0; font-size: 16px; color: #374151;">
                                    Ваш заказ <strong>#{order_number}</strong> успешно принят и скоро будет отправлен.
                                </p>
                                
                                <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                                    <p style="margin: 0; font-size: 14px; color: #1e40af;">
                                        <strong>📅 Ожидаемая доставка:</strong> {estimated_delivery.strftime('%d %B %Y')}
                                    </p>
                                </div>
                                
                                <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #111827;">📦 Детали заказа</h2>
                                
                                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 30px;">
                                    <thead>
                                        <tr style="background-color: #f9fafb;">
                                            <th style="padding: 12px; text-align: left; font-size: 14px; color: #6b7280; font-weight: 600;">Товар</th>
                                            <th style="padding: 12px; text-align: center; font-size: 14px; color: #6b7280; font-weight: 600;">Кол-во</th>
                                            <th style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280; font-weight: 600;">Цена</th>
                                            <th style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280; font-weight: 600;">Сумма</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items_html}
                                        {promo_html}
                                        <tr style="background-color: #f9fafb;">
                                            <td colspan="3" style="padding: 16px; text-align: right; font-size: 18px; font-weight: bold; color: #111827;">Итого:</td>
                                            <td style="padding: 16px; text-align: right; font-size: 18px; font-weight: bold; color: #7c3aed;">{"Бесплатно" if total == 0 else f"{total} ₽"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                                    <div>
                                        <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #111827;">📍 Адрес доставки</h3>
                                        <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                                            {delivery.get('city', '')}, {delivery.get('postalCode', '')}<br>
                                            {delivery.get('address', '')}<br>
                                            {customer.get('phone', '')}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #111827;">💳 Способ оплаты</h3>
                                        <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                            {"Банковская карта" if order.get('paymentMethod') == 'card' else "Наличные" if order.get('paymentMethod') == 'cash' else "СБП"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div style="text-align: center; margin-top: 30px;">
                                    <a href="https://your-domain.com/track-order?order={order_number}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                        📍 Отследить заказ
                                    </a>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; text-align: center;">
                                    Если у вас есть вопросы, свяжитесь с нами
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                    © 2024 CYBERPUNK PC. Все права защищены.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    '''
    
    return html_body

def generate_status_update_email(order: Dict[str, Any]) -> str:
    customer = order.get('customer', {})
    customer_email = customer.get('email', '')
    order_number = order.get('orderNumber', 'N/A')
    status = order.get('status', 'processing')
    
    status_info = {
        'processing': {
            'title': 'Заказ в обработке',
            'emoji': '⏳',
            'message': 'Мы проверяем наличие товаров на складе и готовим ваш заказ к отправке.',
            'color': '#3b82f6'
        },
        'shipped': {
            'title': 'Заказ отправлен',
            'emoji': '🚚',
            'message': 'Ваш заказ передан курьерской службе и уже в пути!',
            'color': '#8b5cf6'
        },
        'completed': {
            'title': 'Заказ доставлен',
            'emoji': '✅',
            'message': 'Ваш заказ успешно доставлен. Спасибо за покупку!',
            'color': '#10b981'
        }
    }
    
    info = status_info.get(status, status_info['processing'])
    
    html_body = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: {info['color']}; border-radius: 8px 8px 0 0;">
                                <div style="font-size: 48px; margin-bottom: 10px;">{info['emoji']}</div>
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">{info['title']}</h1>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 40px;">
                                <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151;">
                                    Здравствуйте, <strong>{customer.get('firstName', '')} {customer.get('lastName', '')}</strong>!
                                </p>
                                <p style="margin: 0 0 30px 0; font-size: 16px; color: #374151;">
                                    {info['message']}
                                </p>
                                
                                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                                    <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                        <strong>Номер заказа:</strong> #{order_number}
                                    </p>
                                </div>
                                
                                <div style="text-align: center;">
                                    <a href="https://your-domain.com/track-order?order={order_number}" style="display: inline-block; background: {info['color']}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                        Отследить заказ
                                    </a>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #9ca3af; text-align: center;">
                                    © 2024 CYBERPUNK PC. Все права защищены.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    '''
    
    return html_body