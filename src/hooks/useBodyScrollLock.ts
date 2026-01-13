import { useEffect } from 'react';

/**
 * Hook para bloquear el scroll del body cuando un modal/drawer está abierto.
 * Previene el scroll del contenido de fondo en dispositivos móviles.
 * 
 * @param isLocked - Si es true, bloquea el scroll del body
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose, children }) {
 *   useBodyScrollLock(isOpen);
 *   
 *   if (!isOpen) return null;
 *   
 *   return (
 *     <div className="modal modal-open">
 *       <div className="modal-box overflow-y-auto overscroll-contain">
 *         {children}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (isLocked) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Bloquear el body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.classList.add('overflow-hidden', 'touch-none');
      
      return () => {
        // Restaurar el scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.classList.remove('overflow-hidden', 'touch-none');
        
        // Restaurar la posición del scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
}

/**
 * Funciones utilitarias para bloquear/desbloquear el scroll del body
 * manualmente (para uso con JavaScript vanilla o casos especiales).
 */
export const bodyScrollLock = {
  scrollPosition: 0,

  lock(): void {
    this.scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.classList.add('overflow-hidden', 'touch-none');
  },

  unlock(): void {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.classList.remove('overflow-hidden', 'touch-none');
    window.scrollTo(0, this.scrollPosition);
  },
};
