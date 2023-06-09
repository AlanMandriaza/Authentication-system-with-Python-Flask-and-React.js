"""empty message

Revision ID: cbb9c5c696fd
Revises: 322e37d3c86c
Create Date: 2023-04-25 00:56:58.665353

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cbb9c5c696fd'
down_revision = '322e37d3c86c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('generes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('genere_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'generes', ['genere_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('genere_id')

    op.drop_table('generes')
    # ### end Alembic commands ###
