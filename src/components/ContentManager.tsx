import { contentConfig } from '@/lib/contentConfig'
import { Card } from '@/components/mdx'

interface ContentManagerProps {
  contentType: 'docs' | 'blogs' | 'guides' | 'resources'
  sectionId?: string
}

export function ContentManager({ contentType, sectionId }: ContentManagerProps) {
  const content = contentConfig[contentType]
  
  if (!content) {
    return <div>Content type not found</div>
  }
  
  const filteredSections = sectionId 
    ? content.sections.filter(section => section.id === sectionId)
    : content.sections
  
  return (
    <div className="mt-6">
      <div className="not-prose grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredSections.map((section) => (
          <Card key={section.id} href={section.path}>
            <Card.Title>{section.title}</Card.Title>
            <Card.Description>{section.description}</Card.Description>
            <Card.Cta>View content</Card.Cta>
          </Card>
        ))}
      </div>
    </div>
  )
}