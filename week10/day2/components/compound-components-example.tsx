/**
 * Compound Components Pattern
 * 
 * Components that work together to form a complete UI.
 * Share state through Context without prop drilling.
 */

'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

/**
 * Tabs Component Example
 */
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within Tabs')
  }
  return context
}

interface TabsProps {
  children: ReactNode
  defaultValue: string
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

interface TabProps {
  value: string
  children: ReactNode
}

Tabs.Tab = function Tab({ value, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs()
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`tab ${isActive ? 'active' : ''}`}
    >
      {children}
    </button>
  )
}

interface TabPanelProps {
  value: string
  children: ReactNode
}

Tabs.Panel = function TabPanel({ value, children }: TabPanelProps) {
  const { activeTab } = useTabs()
  
  if (activeTab !== value) return null

  return <div className="tab-panel">{children}</div>
}

// Usage
export function TabsExample() {
  return (
    <Tabs defaultValue="profile">
      <div className="tab-list">
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      </div>

      <Tabs.Panel value="profile">
        <h2>Profile Content</h2>
        <p>Your profile information here...</p>
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        <h2>Settings Content</h2>
        <p>Your settings here...</p>
      </Tabs.Panel>

      <Tabs.Panel value="notifications">
        <h2>Notifications Content</h2>
        <p>Your notifications here...</p>
      </Tabs.Panel>
    </Tabs>
  )
}

/**
 * Accordion Component Example
 */
interface AccordionContextType {
  openItems: string[]
  toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordion() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within Accordion')
  }
  return context
}

interface AccordionProps {
  children: ReactNode
  multiple?: boolean
}

export function Accordion({ children, multiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggle = (id: string) => {
    setOpenItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      }
      return multiple ? [...prev, id] : [id]
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  id: string
  children: ReactNode
}

Accordion.Item = function AccordionItem({ id, children }: AccordionItemProps) {
  return <div className="accordion-item">{children}</div>
}

interface AccordionTriggerProps {
  id: string
  children: ReactNode
}

Accordion.Trigger = function AccordionTrigger({ id, children }: AccordionTriggerProps) {
  const { openItems, toggle } = useAccordion()
  const isOpen = openItems.includes(id)

  return (
    <button
      onClick={() => toggle(id)}
      className="accordion-trigger"
      aria-expanded={isOpen}
    >
      {children}
      <span>{isOpen ? '▼' : '▶'}</span>
    </button>
  )
}

interface AccordionContentProps {
  id: string
  children: ReactNode
}

Accordion.Content = function AccordionContent({ id, children }: AccordionContentProps) {
  const { openItems } = useAccordion()
  const isOpen = openItems.includes(id)

  if (!isOpen) return null

  return <div className="accordion-content">{children}</div>
}

// Usage
export function AccordionExample() {
  return (
    <Accordion multiple>
      <Accordion.Item id="item1">
        <Accordion.Trigger id="item1">
          What is Next.js?
        </Accordion.Trigger>
        <Accordion.Content id="item1">
          Next.js is a React framework for building web applications.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="item2">
        <Accordion.Trigger id="item2">
          What is Server Components?
        </Accordion.Trigger>
        <Accordion.Content id="item2">
          Server Components render on the server and send HTML to the client.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="item3">
        <Accordion.Trigger id="item3">
          What is App Router?
        </Accordion.Trigger>
        <Accordion.Content id="item3">
          App Router is the new routing system in Next.js 13+.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}

/**
 * Select Component Example
 */
interface SelectContextType {
  value: string
  onChange: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

function useSelect() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within Select')
  }
  return context
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  children: ReactNode
}

export function Select({ value, onChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  )
}

Select.Trigger = function SelectTrigger({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useSelect()

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="select-trigger"
    >
      {children}
      <span>{isOpen ? '▲' : '▼'}</span>
    </button>
  )
}

Select.Content = function SelectContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSelect()

  if (!isOpen) return null

  return <div className="select-content">{children}</div>
}

interface SelectOptionProps {
  value: string
  children: ReactNode
}

Select.Option = function SelectOption({ value, children }: SelectOptionProps) {
  const { onChange, setIsOpen, value: selectedValue } = useSelect()
  const isSelected = selectedValue === value

  return (
    <button
      onClick={() => {
        onChange(value)
        setIsOpen(false)
      }}
      className={`select-option ${isSelected ? 'selected' : ''}`}
    >
      {children}
    </button>
  )
}

// Usage
export function SelectExample() {
  const [country, setCountry] = useState('us')

  return (
    <Select value={country} onChange={setCountry}>
      <Select.Trigger>
        {country === 'us' ? 'United States' : 
         country === 'uk' ? 'United Kingdom' : 
         'Select Country'}
      </Select.Trigger>

      <Select.Content>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="au">Australia</Select.Option>
      </Select.Content>
    </Select>
  )
}
