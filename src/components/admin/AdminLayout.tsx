import { useCallback, useRef, useState } from 'react'

// local modules
import Appbar from '@/components/admin/Appbar'
import Drawer from '@/components/admin/Drawer'
import Menus from '@/components/admin/Menus'
import useClickOutside from '@/hooks/useClickOutside'
import useMediaQuery from '@/hooks/useMediaQueries'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const laptop = useMediaQuery('(min-width: 968px')

    const handleClick = useCallback(() => {
        setDrawerOpen(!drawerOpen)
    }, [drawerOpen])

    const drawerRef = useRef<HTMLDivElement>(null)

    useClickOutside(drawerRef, () => setDrawerOpen(false))

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Drawer ref={drawerRef} handleOpen={!laptop ? handleClick : undefined} open={laptop ? true : drawerOpen}>
                <Menus />
            </Drawer>
            <div
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'rgb(250,250,250)',
                }}
            >
                <Appbar handleClick={handleClick} />
                <div>{children}</div>
            </div>
        </div>
    )
}

export default AdminLayout
